@extends("admin.master")

@section("content")
    <h4 class="page-title">Create Location</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/locations") }}">Locations</a></li>
        <li class="active">Create</li>
    </ol>
    <div>
        {!! Form::open([ 'method'=>'POST', 'url'=>url($adminUrl . '/locations/') ]) !!}
        @include("admin.locations.form", ["create" => true, "submit" => "Create Location"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Create Location | Admin
    </title>
@endsection