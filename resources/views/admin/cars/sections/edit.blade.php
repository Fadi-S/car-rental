@extends("admin.master")

@section("content")
    <h4 class="page-title">Edit Section</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/sections") }}">Sections</a></li>
        <li class="active">Edit '{{ $section->name }}'</li>
    </ol>
    <div>
        @include("delete", ["what"=>"Section", "url"=>url("$adminUrl/sections/$section->id")])
        {!! Form::model($section, [ 'method'=>'PATCH', 'url'=>url($adminUrl . '/sections/' . $section->id) ]) !!}
        @include("admin.cars.sections.form", ["create" => false, "submit" => "Edit Section"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Edit Section | Admin
    </title>
@endsection