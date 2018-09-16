@extends("admin.master")

@section("content")
    <h4 class="page-title">View Client</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/Clients") }}">Clients</a></li>
        <li class="active">{{ $client->name }}</li>
    </ol>

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
                    <td>{{ $car->price }} <strong>L.E.</strong></td>
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