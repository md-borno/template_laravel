<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Immediate check: suppress preloader if already seen on first visit --}}
        <script>
            try {
                if (
                    (sessionStorage.getItem('codlexa_intro_viewed_v1') === 'true' || localStorage.getItem('codlexa_intro_viewed_v1') === 'true') &&
                    !window.location.search.includes('intro') &&
                    !window.location.search.includes('loader')
                ) {
                    document.documentElement.classList.add('codlexa-intro-seen');
                }
            } catch (e) {}
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: #F8FAFC;
            }

            html.dark {
                background-color: #0F172A;
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="apple-touch-icon" href="/icon/CodLexa.png">

        @php
            $appName = config('app.name', 'CODLEXA');
            $component = $page['component'] ?? '';
            $props = $page['props'] ?? [];
            $currentUrl = url()->current();
            $baseUrl = rtrim(url('/'), '/');

            // Determine if current page is private / auth (should be noindexed)
            $isPrivate = in_array($component, [
                'auth/login',
                'auth/register',
                'auth/forgot-password',
                'auth/reset-password',
                'dashboard',
                'BlogPage',
                'ContactUs',
                'HomePage',
                'RegisterUser',
                'user-messages',
                'settings/appearance',
                'settings/profile',
                'settings/security',
            ]) || request()->is('dashboard*', 'settings*', 'dynamic', 'login', 'register', 'user-messages');

            // Default SEO tags (Home)
            $pageTitle = 'CODLEXA | Modern Software & Digital Engineering Solutions';
            $pageDescription = 'Empowering businesses with custom software development, modern web applications, scalable cloud architecture, and high-performance engineering from CODLEXA.';
            $pageImage = asset('icon/CodLexa_icon.png');
            $pageType = 'website';
            $breadcrumbs = [
                ['name' => 'Home', 'url' => $baseUrl],
            ];
            $schemas = [];

            // Route-specific SEO configuration
            if (!empty($props['post'])) {
                $postTitle = data_get($props, 'post.title');
                $postBody = data_get($props, 'post.body');
                $postImage = data_get($props, 'post.image');
                $postCreated = data_get($props, 'post.created_at');
                $postUpdated = data_get($props, 'post.updated_at', $postCreated);

                if ($postTitle) {
                    $pageTitle = \Illuminate\Support\Str::limit($postTitle, 45) . ' | CODLEXA Blog';
                }
                if ($postBody) {
                    $pageDescription = \Illuminate\Support\Str::limit(strip_tags((string) $postBody), 155);
                }
                if ($postImage) {
                    if (preg_match('/drive\.google\.com\/file\/d\/([\w-]+)/', $postImage, $matches) ||
                        preg_match('/drive\.google\.com\/(?:open|uc)\?(?:.*&)?id=([\w-]+)/', $postImage, $matches)) {
                        $pageImage = "https://drive.google.com/thumbnail?id={$matches[1]}&sz=w1600";
                    } elseif (str_starts_with($postImage, 'http://') || str_starts_with($postImage, 'https://')) {
                        $pageImage = $postImage;
                    } else {
                        $pageImage = asset(ltrim($postImage, '/'));
                    }
                }
                $pageType = 'article';
                $breadcrumbs[] = ['name' => 'Blog', 'url' => $baseUrl . '/blog'];
                $breadcrumbs[] = ['name' => (string) $postTitle, 'url' => $currentUrl];

                // Article Schema
                $schemas[] = [
                    '@context' => 'https://schema.org',
                    '@type' => 'Article',
                    'headline' => $postTitle,
                    'description' => $pageDescription,
                    'image' => [$pageImage],
                    'datePublished' => $postCreated ? (is_string($postCreated) ? $postCreated : $postCreated->toIso8601String()) : null,
                    'dateModified' => $postUpdated ? (is_string($postUpdated) ? $postUpdated : $postUpdated->toIso8601String()) : null,
                    'author' => [
                        '@type' => 'Organization',
                        'name' => 'CODLEXA Engineering',
                        'url' => $baseUrl,
                    ],
                    'publisher' => [
                        '@type' => 'Organization',
                        'name' => $appName,
                        'url' => $baseUrl,
                        'logo' => [
                            '@type' => 'ImageObject',
                            'url' => asset('icon/CodLexa.png'),
                        ],
                    ],
                    'mainEntityOfPage' => [
                        '@type' => 'WebPage',
                        '@id' => $currentUrl,
                    ],
                ];
            } elseif ($component === 'site/services') {
                $pageTitle = 'Software Engineering & Cloud Services | CODLEXA';
                $pageDescription = 'Discover our full-suite services: custom software engineering, modern web app development, UI/UX design, cloud architecture, and strategic IT consulting.';
                $breadcrumbs[] = ['name' => 'Services', 'url' => $currentUrl];

                // Service & FAQ Schema
                $schemas[] = [
                    '@context' => 'https://schema.org',
                    '@type' => 'Service',
                    'serviceType' => 'Custom Software Engineering & Web Development',
                    'provider' => [
                        '@type' => 'Organization',
                        'name' => $appName,
                        'url' => $baseUrl,
                    ],
                    'areaServed' => 'Worldwide',
                    'hasOfferCatalog' => [
                        '@type' => 'OfferCatalog',
                        'name' => 'Software Engineering Offerings',
                        'itemListElement' => [
                            ['@type' => 'Offer', 'itemOffered' => ['@type' => 'Service', 'name' => 'Custom Software Engineering']],
                            ['@type' => 'Offer', 'itemOffered' => ['@type' => 'Service', 'name' => 'Modern Web Application Development']],
                            ['@type' => 'Offer', 'itemOffered' => ['@type' => 'Service', 'name' => 'Cloud Architecture & DevOps']],
                            ['@type' => 'Offer', 'itemOffered' => ['@type' => 'Service', 'name' => 'UI/UX Design Systems']],
                        ],
                    ],
                ];

                $schemas[] = [
                    '@context' => 'https://schema.org',
                    '@type' => 'FAQPage',
                    'mainEntity' => [
                        [
                            '@type' => 'Question',
                            'name' => 'What technologies does CODLEXA specialize in?',
                            'acceptedAnswer' => [
                                '@type' => 'Answer',
                                'text' => 'CODLEXA specializes in full-stack web and enterprise development using Laravel, React, TypeScript, Tailwind CSS, Node.js, and modern cloud infrastructures.',
                            ],
                        ],
                        [
                            '@type' => 'Question',
                            'name' => 'How does CODLEXA approach new software projects?',
                            'acceptedAnswer' => [
                                '@type' => 'Answer',
                                'text' => 'We utilize an agile engineering methodology with sprint-based milestones, continuous integration, transparent updates, and robust automated testing.',
                            ],
                        ],
                    ],
                ];
            } elseif ($component === 'site/portfolio') {
                $pageTitle = 'Client Projects & Engineering Portfolio | CODLEXA';
                $pageDescription = 'Explore our featured case studies, enterprise applications, and modern digital products built with scalable architecture and precision engineering.';
                $breadcrumbs[] = ['name' => 'Portfolio', 'url' => $currentUrl];
            } elseif ($component === 'site/about-us') {
                $pageTitle = 'About CODLEXA | Our Mission, Vision & Engineering Team';
                $pageDescription = 'Learn about CODLEXA\'s mission, engineering excellence, and the dedicated software developers building scalable digital systems for modern businesses.';
                $breadcrumbs[] = ['name' => 'About Us', 'url' => $currentUrl];
            } elseif ($component === 'site/career') {
                $pageTitle = 'Careers at CODLEXA | Join Our Software Engineering Team';
                $pageDescription = 'Build your career with CODLEXA. Explore open positions for software engineers, frontend developers, and product creators in a high-growth tech environment.';
                $breadcrumbs[] = ['name' => 'Careers', 'url' => $currentUrl];
            } elseif ($component === 'site/blog') {
                $pageTitle = 'Tech Blog & Engineering Insights | CODLEXA';
                $pageDescription = 'Stay ahead with in-depth articles on software architecture, modern web development, engineering practices, and digital technology trends from CODLEXA.';
                $breadcrumbs[] = ['name' => 'Blog', 'url' => $currentUrl];
            } elseif ($component === 'site/contact-us') {
                $pageTitle = 'Contact CODLEXA | Start Your Next Software Project';
                $pageDescription = 'Connect with CODLEXA today. Discuss your software project requirements, request a consultation, or partner with our expert engineering team.';
                $breadcrumbs[] = ['name' => 'Contact Us', 'url' => $currentUrl];
            }

            // Global Organization Schema
            $schemas[] = [
                '@context' => 'https://schema.org',
                '@type' => 'Organization',
                'name' => $appName,
                'url' => $baseUrl,
                'logo' => asset('icon/CodLexa.png'),
                'description' => 'Modern software engineering, custom digital solutions, cloud architecture, and web development.',
                'sameAs' => [
                    'https://github.com/codlexa',
                    'https://linkedin.com/company/codlexa',
                ],
                'contactPoint' => [
                    '@type' => 'ContactPoint',
                    'contactType' => 'customer service',
                    'url' => $baseUrl . '/contact-us',
                ],
            ];

            // Global WebSite Schema
            $schemas[] = [
                '@context' => 'https://schema.org',
                '@type' => 'WebSite',
                'name' => $appName,
                'url' => $baseUrl,
                'potentialAction' => [
                    '@type' => 'SearchAction',
                    'target' => $baseUrl . '/blog?q={search_term_string}',
                    'query-input' => 'required name=search_term_string',
                ],
            ];

            // BreadcrumbList Schema
            if (count($breadcrumbs) > 0) {
                $itemList = [];
                foreach ($breadcrumbs as $index => $item) {
                    $itemList[] = [
                        '@type' => 'ListItem',
                        'position' => $index + 1,
                        'name' => $item['name'],
                        'item' => $item['url'],
                    ];
                }
                $schemas[] = [
                    '@context' => 'https://schema.org',
                    '@type' => 'BreadcrumbList',
                    'itemListElement' => $itemList,
                ];
            }
        @endphp

        <!-- Primary Meta Tags -->
        <meta name="title" content="{{ $pageTitle }}">
        <meta name="description" content="{{ $pageDescription }}">
        <link rel="canonical" href="{{ $currentUrl }}">

        <!-- Robots Meta Tag -->
        @if($isPrivate)
            <meta name="robots" content="noindex, nofollow">
        @else
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
        @endif

        <!-- Open Graph / Facebook / Messenger / WhatsApp -->
        <meta property="og:type" content="{{ $pageType }}">
        <meta property="og:site_name" content="{{ $appName }}">
        <meta property="og:url" content="{{ $currentUrl }}">
        <meta property="og:title" content="{{ $pageTitle }}">
        <meta property="og:description" content="{{ $pageDescription }}">
        <meta property="og:image" content="{{ $pageImage }}">
        <meta property="og:image:secure_url" content="{{ $pageImage }}">
        <meta property="og:image" content="{{ asset('icon/CodLexa.png') }}">
        <meta property="og:image:secure_url" content="{{ asset('icon/CodLexa.png') }}">
        <meta property="og:image:type" content="image/png">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:image:alt" content="{{ $pageTitle }}">

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:url" content="{{ $currentUrl }}">
        <meta name="twitter:title" content="{{ $pageTitle }}">
        <meta name="twitter:description" content="{{ $pageDescription }}">
        <meta name="twitter:image" content="{{ $pageImage }}">

        <!-- Structured Data (JSON-LD) for Search Engines & AI Crawlers -->
        @foreach($schemas as $schema)
            <script type="application/ld+json">
                {!! json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
            </script>
        @endforeach

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ $pageTitle }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        @include('partials.preloader')

        {{-- Fallback semantic content for crawlers & non-JS search engines --}}
        <noscript>
            <div style="padding: 20px; font-family: sans-serif; background: #fff; color: #111;">
                <h1>{{ $pageTitle }}</h1>
                <p>{{ $pageDescription }}</p>
                <nav aria-label="Main Navigation">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/portfolio">Portfolio</a></li>
                        <li><a href="/about-us">About Us</a></li>
                        <li><a href="/career">Careers</a></li>
                        <li><a href="/blog">Blog & Insights</a></li>
                        <li><a href="/contact-us">Contact Us</a></li>
                    </ul>
                </nav>
                @if(!empty($props['post']))
                    <article>
                        <h2>{{ data_get($props, 'post.title') }}</h2>
                        <div>{!! nl2br(e(data_get($props, 'post.body'))) !!}</div>
                    </article>
                @endif
            </div>
        </noscript>

        <x-inertia::app />
    </body>
</html>
