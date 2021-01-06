@extends("admin.master")

@section("content")
    <h4 class="page-title">Create Section</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/cars") }}">Cars</a></li>
        <li><a href="{{ url("$adminUrl/sections") }}">Sections</a></li>
        <li class="active">Create</li>
    </ol>
    <div>
        {!! Form::open([ 'method'=>'POST', 'url'=>url($adminUrl . '/sections/') ]) !!}
        @include("admin.cars.sections.form", ["create" => true, "submit" => "Create Car Section"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Create Section | Admin
    </title>
@endsection