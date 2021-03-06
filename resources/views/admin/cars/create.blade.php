@extends("admin.master")

@section("content")
    <h4 class="page-title">Create Car</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/cars") }}">Cars</a></li>
        <li class="active">Create</li>
    </ol>
    <div>

        {!! Form::model($car = new \App\Models\Car\Car, [ 'method'=>'POST', 'url'=>url($adminUrl . '/cars/'), 'files'=>"true" ]) !!}
        @include("admin.cars.form", ["create" => true, "submit" => "Create Car"])
        {!! Form::close() !!}

    </div>
@endsection

@section("title")
    <title>
        Create Car | Admin
    </title>
@endsection