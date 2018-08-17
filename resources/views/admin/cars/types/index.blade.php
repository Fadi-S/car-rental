@extends("admin.master")

@section("title")
    <title>All Types | Admin</title>
@endsection

@section("content")
    <h4 class="page-title">All Types</h4>
    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li class="active">Types</li>
    </ol>
    <a href="{{ url("$adminUrl/types/create") }}" class="btn btn-success">Create Type</a>
    <br><br>
    {{ $types->links() }}
    <div class="card-box table-responsize">
        <table class="table data-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Edit</th>
            </tr>
            </thead>

            <tbody>
            @foreach($types as $type)
                <tr>
                    <td>{{ $type->name }}</td>
                    <td><a href="{{ url("$adminUrl/types/$type->id/edit") }}" class="btn btn-info">Edit</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    {{ $types->links() }}

    @include("admin.datatables")
@endsection
