@extends("admin.master")

@section("title")
    <title>All Categories | Admin</title>
@endsection

@section("content")
    <h4 class="page-title">All Categories</h4>
    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li class="active">Categories</li>
    </ol>
    <a href="{{ url("$adminUrl/categories/create") }}" class="btn btn-success">Create Category</a>
    <br><br>
    {{ $categories->links() }}
    <div class="card-box table-responsize">
        <table class="table data-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Edit</th>
            </tr>
            </thead>

            <tbody>
            @foreach($categories as $category)
                <tr>
                    <td>{{ $category->name }}</td>
                    <td><a href="{{ url("$adminUrl/categories/$category->id/edit") }}" class="btn btn-info">Edit</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    {{ $categories->links() }}

    @include("admin.datatables")
@endsection
