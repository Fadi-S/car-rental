@extends("admin.master")

@section("content")
    <h4 class="page-title">Edit Admin</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/admins") }}">Admins</a></li>
        <li><a href="{{ url("$adminUrl/admins/$admin->username") }}">{{ $admin->name }}</a></li>
        <li class="active">Edit</li>
    </ol>
    <div>
        @include("delete", ["what" => "Admin", "url" => url("$adminUrl/admins/$admin->username")])
        <br>
        {!! Form::model($admin, [ 'method'=>'PATCH', 'url'=>url($adminUrl . '/admins/' . $admin->username) ]) !!}
        @include("admin.admins.form", ["create" => false, "submit" => "Edit Admin"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Edit Admin | Admin
    </title>
@endsection