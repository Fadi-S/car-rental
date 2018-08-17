@extends("admin.master")

@section("content")
    <h4 class="page-title">Create Type</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/cars") }}">Cars</a></li>
        <li><a href="{{ url("$adminUrl/types") }}">Types</a></li>
        <li class="active">Create</li>
    </ol>
    <div>
        {!! Form::open([ 'method'=>'POST', 'url'=>url($adminUrl . '/types/') ]) !!}
        @include("admin.cars.types.form", ["create" => true, "submit" => "Create Car Type"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Create Type | Admin
    </title>
@endsection