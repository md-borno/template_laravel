<!DOCTYPE html>
<html>
<head>
    <title>Blog</title>
    @vite('resources/css/app.css')
</head>
<body class="mx-auto max-w-2xl p-6">
    <h1 class="mb-4 text-3xl font-bold">Blog</h1>
    @foreach ($posts as $post)
        <article class="mb-6">
            <h2 class="text-xl font-semibold">{{ $post->title }}</h2>
            <p>{{ $post->body }}</p>
        </article>
    @endforeach
</body>
</html>
