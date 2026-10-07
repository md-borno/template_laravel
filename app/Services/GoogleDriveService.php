<?php

namespace App\Services;

use Google\Client;
use Google\Service\Drive;
use Google\Service\Drive\DriveFile;
use Google\Service\Drive\Permission;
use Illuminate\Http\UploadedFile;
use RuntimeException;

class GoogleDriveService
{
    private ?Drive $drive = null;

    private function drive(): Drive
    {
        if ($this->drive) {
            return $this->drive;
        }

        // $client = new Client();
        // $client->setClientId(env('GOOGLE_DRIVE_CLIENT_ID'));
        // $client->setClientSecret(env('GOOGLE_DRIVE_CLIENT_SECRET'));
        $client = new Client();
$client->setClientId(config('services.google_drive.client_id'));
$client->setClientSecret(config('services.google_drive.client_secret'));

$token = $client->fetchAccessTokenWithRefreshToken(config('services.google_drive.refresh_token'));

        $token = $client->fetchAccessTokenWithRefreshToken(env('GOOGLE_DRIVE_REFRESH_TOKEN'));
        if (isset($token['error'])) {
            throw new RuntimeException('Google Drive auth failed: ' . ($token['error_description'] ?? $token['error']));
        }

        return $this->drive = new Drive($client);
    }

    public function upload(UploadedFile $file): string
    {
        $meta = new DriveFile([
            'name'    => time() . '_' . $file->getClientOriginalName(),
            'parents' => [config('services.google_drive.folder_id')],
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