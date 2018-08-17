@extends("admin.master")

@section("content")
    <h4 class="page-title">Create Category</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/cars") }}">Cars</a></li>
        <li><a href="{{ url("$adminUrl/categories") }}">Categories</a></li>
        <li class="active">Create</li>
    </ol>
    <div>
        {!! Form::open([ 'method'=>'POST', 'url'=>url($adminUrl . '/categories/') ]) !!}
        @include("admin.cars.categories.form", ["create" => true, "submit" => "Create Car Category"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Create Category | Admin
    </title>
@endsection