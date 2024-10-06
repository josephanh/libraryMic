<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>
    @viteReactRefresh 
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead <!-- Required for Inertia.js -->
    <meta name="csrf-token" content="{{ csrf_token() }}"> <!-- CSRF token for AJAX requests -->
    <script src="{{ asset('ckeditor/ckeditor.js') }}"></script> <!-- Include CKEditor if needed -->
</head>
<body>
    @inertia
    <script>
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
    </script>
</body>
</html>
