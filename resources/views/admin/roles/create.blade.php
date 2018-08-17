@extends("admin.master")

@section("title")
    <title>
        Create Role | Admin
    </title>
@endsection

@section("content")
    <h4 class="page-title">@lang("messages.create") @lang("messages.role")</h4>
    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/roles") }}">Roles</a></li>
        <li class="active">Create</li>
    </ol>
    <div>
        {!! Form::open(['method'=>'POST', 'url'=>url("$adminUrl/roles")]) !!}
            @include("admin.roles.form", ["submit" => "Create Role"])
        {!! Form::close() !!}
    </div>
@endsection