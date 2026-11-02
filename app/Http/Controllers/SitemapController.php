<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $baseUrl = rtrim(config('app.url', 'https://codlexa.com'), '/');

        $staticPages = [
            ['loc' => $baseUrl . '/', 'changefreq' => 'daily', 'priority' => '1.0', 'lastmod' => date('Y-m-d')],
            ['loc' => $baseUrl . '/services', 'changefreq' => 'weekly', 'priority' => '0.9', 'lastmod' => date('Y-m-d')],
            ['loc' => $baseUrl . '/portfolio', 'changefreq' => 'weekly', 'priority' => '0.9', 'lastmod' => date('Y-m-d')],
            ['loc' => $baseUrl . '/about-us', 'changefreq' => 'monthly', 'priority' => '0.8', 'lastmod' => date('Y-m-d')],
            ['loc' => $baseUrl . '/career', 'changefreq' => 'weekly', 'priority' => '0.8', 'lastmod' => date('Y-m-d')],
            ['loc' => $baseUrl . '/blog', 'changefreq' => 'daily', 'priority' => '0.8', 'lastmod' => date('Y-m-d')],
            ['loc' => $baseUrl . '/contact-us', 'changefreq' => 'monthly', 'priority' => '0.7', 'lastmod' => date('Y-m-d')],
        ];

        $blogPosts = [];
        try {
            $posts = Blog::latest('updated_at')->get();
            foreach ($posts as $post) {
                $blogPosts[] = [
                    'loc' => $baseUrl . '/blog/' . $post->id,
                    'changefreq' => 'weekly',
                    'priority' => '0.8',
                    'lastmod' => $post->updated_at ? $post->updated_at->format('Y-m-d') : date('Y-m-d'),
                ];
            }
        } catch (\Throwable $e) {
            // Fallback if database is unavailable
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;

        foreach (array_merge($staticPages, $blogPosts) as $url) {
            $xml .= '    <url>' . PHP_EOL;
            $xml .= '        <loc>' . htmlspecialchars($url['loc']) . '</loc>' . PHP_EOL;
            $xml .= '        <lastmod>' . $url['lastmod'] . '</lastmod>' . PHP_EOL;
            $xml .= '        <changefreq>' . $url['changefreq'] . '</changefreq>' . PHP_EOL;
            $xml .= '        <priority>' . $url['priority'] . '</priority>' . PHP_EOL;
            $xml .= '    </url>' . PHP_EOL;
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=utf-8',
        ]);
    }
}

