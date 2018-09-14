@extends("admin.master")

@section("content")
    <h4 class="page-title">Edit Car</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/cars") }}">Cars</a></li>
        <li class="active">Edit</li>
    </ol>
    <div>

        {!! Html::script("js/dropzone.js") !!}
        {!! Html::style("css/dropzone.css") !!}
        {!! Html::style("css/basic.css") !!}

        <form action="{{ url("$adminUrl/cars/$car->id/images") }}" method="POST" class="dropzone">
            <div class="fallback">
                <input name="file" type="file" multiple />
            </div>
        </form>

        <br>

        @include("delete", ["what"=>"Car", "url"=>url("$adminUrl/cars/$car->id")])
        {!! Form::model($car, [ 'method'=>'PATCH', 'url'=>url($adminUrl . '/cars/' . $car->id), 'files'=>"true" ]) !!}
        @include("admin.cars.form", ["create" => false, "submit" => "Edit Car"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Edit Car | Admin
    </title>
@endsection