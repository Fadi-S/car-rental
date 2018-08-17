@extends("admin.master")

@section("title")
    <title>All Locations | Admin</title>
@endsection

@section("content")
    <h4 class="page-title">All Locations</h4>
    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li class="active">Locations</li>
    </ol>
    <a href="{{ url("$adminUrl/locations/create") }}" class="btn btn-success">Create Location</a>
    <br><br>
    {{ $locations->links() }}
    <div class="card-box table-responsize">
        <table class="table data-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Edit</th>
            </tr>
            </thead>

            <tbody>
            @foreach($locations as $location)
                <tr>
                    <td>{{ $location->name }}</td>
                    <td><a href="{{ url("$adminUrl/locations/$location->id/edit") }}" class="btn btn-info">Edit</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    {{ $locations->links() }}

    @include("admin.datatables")
@endsection
