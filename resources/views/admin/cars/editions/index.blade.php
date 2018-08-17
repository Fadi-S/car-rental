@extends("admin.master")

@section("title")
    <title>All Editions | Admin</title>
@endsection

@section("content")
    <h4 class="page-title">All Editions</h4>
    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li class="active">Editions</li>
    </ol>
    <a href="{{ url("$adminUrl/editions/create") }}" class="btn btn-success">Create Edition</a>
    <br><br>
    {{ $editions->links() }}
    <div class="card-box table-responsize">
        <table class="table data-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Edit</th>
            </tr>
            </thead>

            <tbody>
            @foreach($editions as $edition)
                <tr>
                    <td>{{ $edition->name }}</td>
                    <td><a href="{{ url("$adminUrl/editions/$edition->id/edit") }}" class="btn btn-info">Edit</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    {{ $editions->links() }}

    @include("admin.datatables")
@endsection
