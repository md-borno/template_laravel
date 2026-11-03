<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>404 - Page Not Found | CODLEXA</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    @include('partials.google-tag')
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #F8FAFC;
            color: #0F172A;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 24px;
        }
        .container {
            max-width: 580px;
            width: 100%;
            background: #FFFFFF;
            border: 1px solid #DCE4F0;
            border-radius: 24px;
            padding: 48px 36px;
            text-align: center;
            box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.05);
        }
        .logo {
            display: inline-block;
            margin-bottom: 28px;
        }
        .logo img {
            height: 38px;
            width: auto;
        }
        .badge {
            display: inline-block;
            background-color: #EAF2FF;
            color: #004DEB;
            font-size: 13px;
            font-weight: 700;
            padding: 4px 14px;
            border-radius: 9999px;
            margin-bottom: 16px;
            letter-spacing: 0.05em;
        }
        h1 {
            font-size: 32px;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 12px;
            color: #0F172A;
        }
        p {
            font-size: 16px;
            color: #64748B;
            line-height: 1.6;
            margin-bottom: 32px;
        }
        .actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
            margin-bottom: 32px;
        }
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
        }
        .btn-primary {
            background-color: #004DEB;
            color: #FFFFFF;
        }
        .btn-primary:hover {
            background-color: #0038B8;
        }
        .btn-secondary {
            background-color: #F1F5F9;
            color: #334155;
            border: 1px solid #DCE4F0;
        }
        .btn-secondary:hover {
            background-color: #E2E8F0;
        }
        .helpful-links {
            border-top: 1px solid #E2E8F0;
            padding-top: 24px;
            font-size: 14px;
            color: #64748B;
        }
        .helpful-links ul {
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px;
            margin-top: 12px;
        }
        .helpful-links a {
            color: #004DEB;
            text-decoration: none;
            font-weight: 500;
        }
        .helpful-links a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <main class="container">
        <a href="/" class="logo" aria-label="CODLEXA Home">
            <img src="/icon/codlexa_right.png" alt="CODLEXA" width="172" height="32">
        </a>
        <br>
        <span class="badge">Error 404</span>
        <h1>Page Not Found</h1>
        <p>The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let's get you back on track.</p>
        
        <div class="actions">
            <a href="/" class="btn btn-primary">Return to Homepage</a>
            <a href="/contact-us" class="btn btn-secondary">Contact Us</a>
        </div>

        <nav class="helpful-links" aria-label="Quick Links">
            <span>Explore other sections of CODLEXA:</span>
            <ul>
                <li><a href="/services">Services</a></li>
                <li><a href="/portfolio">Portfolio</a></li>
                <li><a href="/about-us">About Us</a></li>
                <li><a href="/career">Careers</a></li>
                <li><a href="/blog">Tech Blog</a></li>
            </ul>
        </nav>
    </main>
</body>
</html>
