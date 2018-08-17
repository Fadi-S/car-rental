@extends("admin.master")

@section("content")
    <h4 class="page-title">Edit Category</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/categories") }}">Categories</a></li>
        <li class="active">Edit '{{ $category->name }}'</li>
    </ol>
    <div>
        @include("delete", ["what"=>"Category", "url"=>url("$adminUrl/categories/$category->id")])
        {!! Form::model($category, [ 'method'=>'PATCH', 'url'=>url($adminUrl . '/categories/' . $category->id) ]) !!}
        @include("admin.cars.categories.form", ["create" => false, "submit" => "Edit Category"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Edit Category | Admin
    </title>
@endsection