@extends("admin.master")

@section("title")
    <title>All Octanes | Admin</title>
@endsection

@section("content")
    <h4 class="page-title">All Octanes</h4>
    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li class="active">Octanes</li>
    </ol>
    <a href="{{ url("$adminUrl/octanes/create") }}" class="btn btn-success">Create Octane</a>
    <br><br>
    {{ $octanes->links() }}
    <div class="card-box table-responsize">
        <table class="table data-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Edit</th>
            </tr>
            </thead>

            <tbody>
            @foreach($octanes as $octane)
                <tr>
                    <td>{{ $octane->name }}</td>
                    <td><a href="{{ url("$adminUrl/octanes/$octane->id/edit") }}" class="btn btn-info">Edit</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    {{ $octanes->links() }}

    @include("admin.datatables")
@endsection
