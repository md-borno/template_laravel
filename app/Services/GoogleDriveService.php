<?php

namespace App\Services;

use Google\Client;
use Google\Service\Drive;
use Google\Service\Drive\DriveFile;
use Google\Service\Drive\Permission;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Cache;
use RuntimeException;

class GoogleDriveService
{
    private ?Drive $drive = null;

    private function drive(): Drive
    {
        if ($this->drive) {
            return $this->drive;
        }

        $clientId     = config('services.google_drive.client_id');
        $clientSecret = config('services.google_drive.client_secret');
        $refreshToken = config('services.google_drive.refresh_token');

        if (!$clientId || !$clientSecret || !$refreshToken) {
            throw new RuntimeException(
                'Google Drive credentials are missing. Check config/services.php and run `php artisan config:clear`.'
            );
        }

        $client = new Client();
        $client->setClientId($clientId);
        $client->setClientSecret($clientSecret);

        // Cache the access token for 55 minutes to avoid hitting OAuth limits
        $token = Cache::remember('google_drive_access_token', 3300, function () use ($client, $refreshToken) {
            $fetched = $client->fetchAccessTokenWithRefreshToken($refreshToken);

            if (isset($fetched['error'])) {
                throw new RuntimeException(
                    sprintf(
                        'Google Drive auth failed [%s]: %s',
                        $fetched['error'],
                        $fetched['error_description'] ?? 'Bad Request'
                    )
                );
            }

            return $fetched;
        });

        $client->setAccessToken($token);

        return $this->drive = new Drive($client);
    }

    public function upload(UploadedFile $file): string
    {
        $folderId = config('services.google_drive.folder_id');

        $meta = new DriveFile([
            'name'    => time() . '_' . $file->getClientOriginalName(),
            'parents' => $folderId ? [$folderId] : [],
        ]);

        $created = $this->drive()->files->create($meta, [
            'data'       => file_get_contents($file->getRealPath()),
            'mimeType'   => $file->getMimeType(),
            'uploadType' => 'multipart',
            'fields'     => 'id',
        ]);

        $this->drive()->permissions->create(
            $created->id,
            new Permission(['type' => 'anyone', 'role' => 'reader'])
        );

        return "https://drive.google.com/file/d/{$created->id}/view";
    }

    public function deleteByUrl(?string $url): void
    {
        if (!$url || !preg_match('#/d/([A-Za-z0-9_-]+)#', $url, $m)) {
            return;
        }

        try {
            $this->drive()->files->delete($m[1]);
        } catch (\Throwable $e) {
            report($e);
        }
    }
}