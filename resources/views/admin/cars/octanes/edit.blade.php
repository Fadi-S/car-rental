@extends("admin.master")

@section("content")
    <h4 class="page-title">Edit Octane</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/octanes") }}">Octanes</a></li>
        <li class="active">Edit '{{ $octane->name }}'</li>
    </ol>
    <div>
        @include("delete", ["what"=>"Octane", "url"=>url("$adminUrl/octanes/$octane->id")])
        {!! Form::model($octane, [ 'method'=>'PATCH', 'url'=>url($adminUrl . '/octanes/' . $octane->id) ]) !!}
        @include("admin.cars.octanes.form", ["create" => false, "submit" => "Edit Octane"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Edit Octane | Admin
    </title>
@endsection