@extends("admin.master")

@section("content")
    <h4 class="page-title">Edit Client</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/clients") }}">Clients</a></li>
        <li><a href="{{ url("$adminUrl/clients/$client->username") }}">{{ $client->name }}</a></li>
        <li class="active">Edit</li>
    </ol>
    <div>
        @include("delete", ["what" => "Client", "url" => url("$adminUrl/clients/$client->username")])
        <br>
        {!! Form::model($client, [ 'method'=>'PATCH', 'url'=>url($adminUrl . '/clients/' . $client->username) ]) !!}
        @include("admin.clients.form", ["create" => false, "submit" => "Edit Client"])
        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Edit Client | Admin
    </title>
@endsection