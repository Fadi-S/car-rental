@extends("admin.master")

@section("content")
    <h4 class="page-title">Edit Type</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/types") }}">Types</a></li>
        <li class="active">Edit '{{ $type->name }}'</li>
    </ol>
    <div>
        @include("delete", ["what"=>"Type", "url"=>url("$adminUrl/types/$type->id")])
        {!! Form::model($type, [ 'method'=>'PATCH', 'url'=>url($adminUrl . '/types/' . $type->id) ]) !!}
        @include("admin.cars.types.form", ["create" => false, "submit" => "Edit Type"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Edit Type | Admin
    </title>
@endsection