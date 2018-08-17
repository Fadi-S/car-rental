@extends("admin.master")

@section("content")
    <h4 class="page-title">Create Octane</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/cars") }}">Cars</a></li>
        <li><a href="{{ url("$adminUrl/octanes") }}">Octanes</a></li>
        <li class="active">Create</li>
    </ol>
    <div>
        {!! Form::open([ 'method'=>'POST', 'url'=>url($adminUrl . '/octanes/') ]) !!}
        @include("admin.cars.octanes.form", ["create" => true, "submit" => "Create Car Octane"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Create Octane | Admin
    </title>
@endsection