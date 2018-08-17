@extends("admin.master")

@section("content")
    <h4 class="page-title">Create Admin</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/admins") }}">Admins</a></li>
        <li class="active">Create</li>
    </ol>
    <div>
        {!! Form::open([ 'method'=>'POST', 'url'=>url($adminUrl . '/admins/') ]) !!}
        @include("admin.admins.form", ["create" => true, "submit" => "Create Admin"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Create Admin | Admin
    </title>
@endsection