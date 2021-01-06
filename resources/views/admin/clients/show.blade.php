@extends("admin.master")

@section("content")
    <h4 class="page-title">View Client</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/clients") }}">Clients</a></li>
        <li class="active">{{ $client->name }}</li>
    </ol>

    <div class="card-box row">
        <div class="form-group">
            @can("edit_client")
                <div class="pull-right">
                    <a class="btn btn-primary ml-auto" style="color:white;" href="{{ url("$adminUrl/clients/$client->username/edit") }}">
                        <span class="fa fa-edit"></span> Edit Client
                    </a>
                </div>
            @endcan
            <h2 style="font-weight: bold;">Client Information</h2>
            <h3>Name: {{ $client->name }}</h3>
            <h3>Email: {{ $client->email }}</h3>
            <h3>Phone: {{ $client->phone }}</h3>
            @if($client->location)
                <h3>Location: {{ $client->location->name }}</h3>
            @endif
            @if($client->area)
                <h3>Area: {{ $client->area->name }}</h3>
            @endif
        </div>

    </div>
    <h3 class="page-title">All Cars</h3>
    {{ $cars->links() }}
    <div class="card-box table-responsize">
        <table class="table data-table">
            <thead>
            <tr>
                <th>Cover Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Status</th>
                <th>View</th>
                <th>Edit</th>
            </tr>
            </thead>

            <tbody>
            @foreach($cars as $car)
                <tr>
                    <td><img src="{{ $car->cover }}" width="70" height="70"></td>
                    <td>{{ $car->title }}</td>
                    <td>{{ $car->getField("price") }} <strong>L.E.</strong></td>
                    <td><span style="font-weight:bold; color:{{ $car->status->color }}">{{ $car->status->name }}</span></td>
                    <td><a href="{{ url("$adminUrl/cars/$car->id/") }}" class="btn btn-primary">View</a></td>
                    <td><a href="{{ url("$adminUrl/cars/$car->id/edit") }}" class="btn btn-info">Edit</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    {{ $cars->links() }}

    <h3 class="page-title">All Requests</h3>
    {{ $requests->links() }}
    <div class="card-box table-responsize">
        <table class="table data-table">
            <thead>
            <tr>
                <th>Cover Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Message</th>
                <th>View</th>
            </tr>
            </thead>

            <tbody>
            @foreach($requests as $request)
                <tr>
                    <td><img src="{{ $request->car->cover }}" width="70" height="70"></td>
                    <td>{{ $request->car->title }}</td>
                    <td>{{ $request->car->getField("price") }} <strong>L.E.</strong></td>
                    <td>{{ $request->message }}</td>
                    <td><a href="{{ url("$adminUrl/cars/" . $request->car->id) }}" class="btn btn-primary">View</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    {{ $requests->links() }}

    @if($client->note)
        <h3 class="page-title">Client Note</h3>
        <div class="card-box table-responsize">
            {{ $client->note }}
        </div>
    @endif

    @include("admin.datatables")
@endsection

@section("title")
    <title>
        View Client '{{ $client->name }}' | Ahmed Zaki Cars
    </title>
@endsection
