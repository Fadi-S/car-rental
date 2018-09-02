@extends("admin.master")

@section("content")
    <h4 class="page-title">Create Client</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/clients") }}">Clients</a></li>
        <li class="active">Create</li>
    </ol>
    <div>
        {!! Form::open([ 'method'=>'POST', 'url'=>url($adminUrl . '/clients/') ]) !!}
        @include("admin.clients.form", ["create" => true, "submit" => "Create Client"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Create Client | Client
    </title>
@endsection