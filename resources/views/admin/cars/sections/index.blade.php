@extends("admin.master")

@section("title")
    <title>All Sections | Admin</title>
@endsection

@section("content")
    <h4 class="page-title">All Sections</h4>
    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li class="active">Sections</li>
    </ol>
    <a href="{{ url("$adminUrl/sections/create") }}" class="btn btn-success">Create Section</a>
    <br><br>
    {{ $sections->links() }}
    <div class="card-box table-responsize">
        <table class="table data-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Edit</th>
            </tr>
            </thead>

            <tbody>
            @foreach($sections as $section)
                <tr>
                    <td>{{ $section->name }}</td>
                    <td><a href="{{ url("$adminUrl/sections/$section->id/edit") }}" class="btn btn-info">Edit</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    {{ $sections->links() }}

    @include("admin.datatables")
@endsection
