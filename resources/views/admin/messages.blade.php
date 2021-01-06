@extends("admin.master")

@section("title")
    <title>All Messages | Ahmed Zaki Cars</title>
@endsection

@section("content")
    <h4 class="page-title">All Messages</h4>
    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li class="active">Messages</li>
    </ol>
    {{ $messages->links() }}
    <div class="card-box table-responsize">
        <table class="table data-table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
            </tr>
            </thead>

            <tbody>
            @foreach($messages as $message)
                <tr>
                    <td>{{ $message->name }}</td>
                    <td>{{ $message->email }}</td>
                    <td>{{ $message->phone }}</td>
                    <td>{{ $message->message }}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    {{ $messages->links() }}

    @include("admin.datatables")
@endsection
