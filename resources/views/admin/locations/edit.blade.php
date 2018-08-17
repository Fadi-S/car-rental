@extends("admin.master")

@section("content")
    <h4 class="page-title">Edit Location</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/locations") }}">Locations</a></li>
        <li class="active">Edit '{{ $location->name }}'</li>
    </ol>
    <div>
        @include("delete", ["what"=>"Location", "url"=>url("$adminUrl/locations/$location->id")])
        {!! Form::model($location, [ 'method'=>'PATCH', 'url'=>url($adminUrl . '/locations/' . $location->id) ]) !!}
        @include("admin.locations.form", ["create" => false, "submit" => "Edit Location"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Edit Location | Admin
    </title>
@endsection