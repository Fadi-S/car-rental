@extends("admin.master")

@section("title")
    <title>All Clients | Admin</title>
@endsection

@section("content")
    <h4 class="page-title">All Clients</h4>
    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li class="active">Clients</li>
    </ol>
    <a href="{{ url("$adminUrl/clients/create") }}" class="btn btn-success">Create Client</a>
    <br><br>
    {{ $clients->links() }}
    <div class="card-box table-responsize">
        <table class="table data-table">
            <thead>
            <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Active</th>
                @can("edit_client")
                    <th>Edit</th>
                @endcan
            </tr>
            </thead>

            <tbody>
            @foreach($clients as $client)
                <tr>
                    <td><img src="{{ $client->picture }}" class="thumb-md img-circle"></td>
                    <td>{{ $client->name }}</td>
                    <td>{{ $client->email }}</td>
                    <td>{{ $client->phone }}</td>
                    <td>
                        <span class="fa fa-thumbs-o-{{ (is_null($client->archived_at)) ? "up" : "down" }}"
                              style="font-size:20px;color:{{ (is_null($client->archived_at)) ? "green" : "red" }};"></span>
                    </td>

                    @can("edit_client")
                        <td><a href="{{ url("$adminUrl/clients/$client->username/edit") }}" class="btn btn-info">Edit</a></td>
                    @endcan
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    {{ $clients->links() }}

    @include("admin.datatables")
@endsection
