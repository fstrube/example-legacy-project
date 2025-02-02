@extends('layouts.app')

@section('content')
<div class="container" id="app">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <feed user="{{ auth()->user() }}" />
        </div>
    </div>
</div>
@endsection
