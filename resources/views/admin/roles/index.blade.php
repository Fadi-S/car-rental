@extends("admin.master")

@section("title")
    <title>
        All roles | Admin
    </title>
@endsection

@section("content")
    <h4 class="page-title">All Roles</h4>
    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li class="active">Roles</li>
    </ol>
    <a href="{{ url("$adminUrl/roles/create") }}" class="btn btn-success">Create Role</a>

    <br><br>
    <div class="card-box table-responsize">
    <table class="table data-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Edit</th>
            </tr>
        </thead>

        <tbody>
            @foreach($roles as $role)
                <tr>
                    <td>{{ $role->name }}</td>
                    <td><a href="{{ url("$adminUrl/roles/$role->id/edit") }}" class="btn btn-info">Edit</a></td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection