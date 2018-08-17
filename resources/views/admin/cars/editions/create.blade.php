@extends("admin.master")

@section("content")
    <h4 class="page-title">Create Edition</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/cars") }}">Cars</a></li>
        <li><a href="{{ url("$adminUrl/editions") }}">Editions</a></li>
        <li class="active">Create</li>
    </ol>
    <div>
        {!! Form::open([ 'method'=>'POST', 'url'=>url($adminUrl . '/editions/') ]) !!}
        @include("admin.cars.editions.form", ["create" => true, "submit" => "Create Car Edition"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Create Edition | Admin
    </title>
@endsection