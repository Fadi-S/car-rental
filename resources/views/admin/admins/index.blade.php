@extends("admin.master")

@section("title")
    <title>All Admins | Admin</title>
@endsection

@section("content")
    <h4 class="page-title">All Admins</h4>
    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li class="active">Admins</li>
    </ol>
    <a href="{{ url("$adminUrl/admins/create") }}" class="btn btn-success">Create Admin</a>
    <br><br>
    {{ $admins->links() }}
    <div class="card-box table-responsize">
        <table class="table data-table">
            <thead>
            <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Active</th>
                <th>View</th>
                @can("edit_admin")
                    <th>Edit</th>
                @endcan
            </tr>
            </thead>

            <tbody>
            @foreach($admins as $admin)
                <tr>
                    <td><img src="{{ $admin->picture }}" class="thumb-md img-circle"></td>
                    <td>{{ $admin->name }}</td>
                    <td>{{ $admin->email }}</td>
                    <td>{{ $admin->phone }}</td>
                    <td>
                        <span class="fa fa-thumbs-o-{{ (is_null($admin->archived_at)) ? "up" : "down" }}"
                              style="font-size:20px;color:{{ (is_null($admin->archived_at)) ? "green" : "red" }};"></span>
                    </td>

                    <td><a href="{{ url("$adminUrl/admins/$admin->username/") }}" class="btn btn-primary">View</a></td>
                    @if(auth()->guard("admin")->user()->hasPermission("edit_admin"))
                        <td><a href="{{ url("$adminUrl/admins/$admin->username/edit") }}" class="btn btn-info">Edit</a></td>
                    @endif
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    {{ $admins->links() }}

    @include("admin.datatables")
@endsection
