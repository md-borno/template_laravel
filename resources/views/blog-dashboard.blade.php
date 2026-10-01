<h1>Blog Dashboard</h1>

@if(session('success'))
    <p>{{ session('success') }}</p>
@endif

<form method="POST" action="/dashboard/blog">
    @csrf

    <label for="title">Title</label>
    <input type="text" id="title" name="title" value="{{ old('title') }}">
    @error('title')
        <p>{{ $message }}</p>
    @enderror

    <label for="body">Body</label>
    <textarea id="body" name="body">{{ old('body') }}</textarea>
    @error('body')
        <p>{{ $message }}</p>
    @enderror

    <button type="submit">Add Post</button>
</form>

<hr>

@foreach($posts as $post)
    <div>
        <strong>{{ $post->title }}</strong>

        <form method="POST" action="/dashboard/blog/{{ $post->id }}" style="display:inline">
            @csrf
            @method('DELETE')
            <button type="submit">Delete</button>
        </form>
    </div>
@endforeach
