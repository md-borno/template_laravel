<h1>Dashboard</h1>

@if(session('success'))
    <p>{{ session('success') }}</p>
@endif

<form method="POST" action="{{ route('dashboard.home-page.title.update') }}">
    @csrf
    @method('PUT')

    <label for="title">Home Page Title</label>

    <input
        type="text"
        id="title"
        name="title"
        value="{{ $homePage->title }}"
    >

    @error('title')
        <p>{{ $message }}</p>
    @enderror

    <button type="submit">
        Update Title
    </button>
</form>
