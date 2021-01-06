@extends("admin.master")

@section("title")
    <title>All Cars | Admin</title>
@endsection

@section("content")
    <h4 class="page-title">All Cars</h4>
    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li class="active">Cars</li>
    </ol>
    <a href="{{ url("$adminUrl/cars/create") }}" class="btn btn-success">Create Car</a>
    <br><br>
    {{ $cars->links() }}
    <div class="card-box table-responsize">
        <table class="table data-table">
            <thead>
            <tr>
                <th>Serial</th>
                <th>Cover Image</th>
                <th>Title</th>
                <th>Seller</th>
                <th>Creator</th>
                <th>Category</th>
                <th>Edition</th>
                <th>Type</th>
                <th>Octane</th>
                <th>Location</th>
                <th>Price</th>
                <th>Status</th>
                <th>View</th>
                <th>Edit</th>
            </tr>
            </thead>

            <tbody>
            @foreach($cars as $car)
                <tr>
                    <td>#{{ $car->serial }}</td>
                    <td><img src="{{ $car->cover }}" width="70" height="70"></td>
                    <td>{{ $car->title }}</td>
                    <td><a href="{{ url("$adminUrl/clients/" . $car->client->username) }}">{{ $car->client->name }}</a></td>
                    <td>@if($car->creator)<a href="{{ url("$adminUrl/admins/" . $car->creator->username) }}">{{ $car->creator->name }}</a>@endif</td>
                    <td>{{ $car->getField("category_id")->name }}</td>
                    <td>{{ $car->getField("edition_id")->name }}</td>
                    <td>{{ $car->getField("type_id")->name }}</td>
                    <td>{{ $car->getField("octane_id")->name }}</td>
                    <td>{{ $car->getField("location_id")->name }}</td>
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
