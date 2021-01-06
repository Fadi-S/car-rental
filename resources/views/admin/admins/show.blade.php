@extends("admin.master")

@section("content")
    <h4 class="page-title">View Client</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/admins") }}">Admins</a></li>
        <li class="active">{{ $admin->name }}</li>
    </ol>

    <div class="card-box row">
        <div class="form-group">
            @can("edit_admin")
                <div class="pull-right">
                    <a class="btn btn-primary ml-auto" style="color:white;" href="{{ url("$adminUrl/admins/$admin->username/edit") }}">
                        <span class="fa fa-edit"></span> Edit Admin
                    </a>
                </div>
            @endcan
            <h2 style="font-weight: bold;">Client Information</h2>
            <h3>Name: {{ $admin->name }}</h3>
            <h3>Email: {{ $admin->email }}</h3>
            <h3>Phone: {{ $admin->phone }}</h3>
            <h3>Location: {{ $admin->location->name }}</h3>
            <h3>Role: {{ $admin->role->name }}</h3>
        </div>
    </div>

    <h3 class="page-title">All Cars</h3>
    {{ $cars->links() }}
    <div class="card-box table-responsize">
        <table class="table data-table">
            <thead>
            <tr>
                <th>Cover Image</th>
                <th>Seller</th>
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
                    <td><a href="{{ url("$adminUrl/admins/" . $car->client->username) }}">{{ $car->client->name }}</a></td>
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

    @include("admin.datatables")
@endsection

@section("title")
    <title>
        View Admin | Ahmed Zaki Cars
    </title>
@endsection