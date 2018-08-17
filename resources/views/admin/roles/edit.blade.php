@extends("admin.master")

@section("title")
    <title>
        Edit Role | Admin
    </title>
@endsection

@section("content")
    <h4 class="page-title">Edit Role</h4>
    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/roles") }}">Roles</a></li>
        <li class="active">Edit '{{ $role->name }}'</li>
    </ol>
    <div>
        {!! Form::model($role, ['method'=>'PATCH', 'url'=>url("$adminUrl/roles/$role->id")]) !!}
        @include("admin.roles.form", ["submit" => "Edit Role"])
        {!! Form::close() !!}
    </div>
@endsection