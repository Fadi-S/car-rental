@extends('admin.master')

@section('content')
    <h4 class="page-title">View All Admins Activity</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/admins") }}">Admins</a></li>
        <li class="active">Activity</li>
    </ol>
    <div class="card-box">
        {{ $activities->render("pagination::bootstrap-4") }}
        <table class="table data-table table-striped table-bordered" cellspacing="0" width="100%">
            <thead>
            <tr>
                <th>Picture</th>
                <th>by</th>
                <th>Name</th>
                <th>Type</th>
                <th>Action</th>
                <th>Changes</th>
                <th>Time</th>
                <th>Restore</th>
            </tr>
            </thead>
            <tbody>
            @foreach($activities as $activity)
                <tr>
                    <td><img height="70" width="70" src="{{ $activity->creator()->picture }}"></td>
                    <td>{{ $activity->creator()->name }}</td>
                    <td>
                        {{ $activity->logged()->name }}
                    </td>
                    <td>{{ $activity->humanReadableType() }}</td>
                    <td>{{ ucfirst($activity->action()) }}</td>
                    <td>
                        @if($activity->action() == 'edit')
                            <button class="btn btn-success" data-target="#changes{{ $activity->id }}"
                                    data-toggle="modal">View Changes
                            </button>
                        @endif
                    </td>
                    <td>{{ $activity->done_at->diffforhumans() }}</td>
                    <td>
                        @if($activity->action() == "delete" && is_null($activity->restored_at))
                            {!! Form::open(['method'=>"POST", "url"=>"$adminUrl/admins/activity/$activity->id/restore"]) !!}
                            {!! Form::submit("Restore", ['class'=>"btn btn-success"]) !!}
                            {!! Form::close() !!}
                        @endif
                    </td>
                </tr>
                @if($activity->action() == 'edit')
                    <div class="modal fade" id="changes{{ $activity->id }}">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <span style="font-weight: bold;">Changes</span>
                                    <button type="button" class="close"
                                            data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                    <span>Old: <pre>{{ print_r($activity->old(), true) }}</pre></span>
                                    <br>
                                    <span>New: <pre>{{ print_r($activity->new(), true) }}</pre></span>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-info" data-dismiss="modal">Ok</button>
                                </div>
                            </div>
                        </div>
                    </div>
                @endif
            @endforeach
            </tbody>
        </table>
        {{ $activities->render("pagination::bootstrap-4") }}
    </div>
    @include("admin.datatables")
@endsection

@section('title')
    <title>Admin Activity Log | Admin</title>
@endsection