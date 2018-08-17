@extends("admin.master")

@section("content")
    <h4 class="page-title">Edit Edition</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/editions") }}">Editions</a></li>
        <li class="active">Edit '{{ $edition->name }}'</li>
    </ol>
    <div>
        @include("delete", ["what"=>"Edition", "url"=>url("$adminUrl/editions/$edition->id")])
        {!! Form::model($edition, [ 'method'=>'PATCH', 'url'=>url($adminUrl . '/editions/' . $edition->id) ]) !!}
        @include("admin.cars.editions.form", ["create" => false, "submit" => "Edit Edition"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Edit Edition | Admin
    </title>
@endsection