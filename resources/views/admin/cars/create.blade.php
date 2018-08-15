@extends("admin.master")

@section("content")
    <h4 class="page-title">Create Car</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/cars") }}">Cars</a></li>
        <li class="active">Create Car</li>
    </ol>
    <div>
        {!! Form::open([ 'method'=>'POST', 'url'=>url($adminUrl . '/cars/') ]) !!}
        @include("admin.cars.form", ["create" => true, "submit" => "Create Car"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Create Car | Admin
    </title>
@endsection