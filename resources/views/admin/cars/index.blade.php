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
                <th>Category</th>
                <th>Edition</th>
                <th>Type</th>
                <th>Octane</th>
                <th>Location</th>
                <th>Price</th>
                <th>View</th>
                <th>Edit</th>
            </tr>
            </thead>

            <tbody>
            @foreach($cars as $car)
                <tr>
                    <td>{{ $car->category->name }}</td>
                    <td>{{ $car->edition->name }}</td>
                    <td>{{ $car->type->name }}</td>
                    <td>{{ $car->octane->name }}</td>
                    <td>{{ $car->location->name }}</td>
                    <td>{{ $car->price }}</td>
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
