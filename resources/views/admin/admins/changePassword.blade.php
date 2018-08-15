@extends("admin.master")

@section("content")
    <h4 class="page-title">Change Password</h4>
    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li class="active">Change Password</li>
    </ol>
    <div>
        {!! Form::open(['method'=>'POST', 'url'=>url($adminUrl . '/change-password')]) !!}

        <div class="card-box">
            <div class="row">
                <div class="col-md-6 form-group {{ ($errors->has("old_password")) ? " has-error" : "" }}">
                    {!! Form::label("old_password", "Old Password *") !!}
                    {!! Form::password("old_password", ['class'=>'form-control', "required"]) !!}
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 form-group {{ ($errors->has("new_password")) ? " has-error" : "" }}">
                    {!! Form::label("new_password", "New Password *") !!}
                    {!! Form::password("new_password", ['class'=>'form-control', "required"]) !!}
                </div>

                <div class="col-md-6 form-group {{ ($errors->has("new_password_confirmation")) ? " has-error" : "" }}">
                    {!! Form::label("new_password_confirmation", "Confirm New Password *") !!}
                    {!! Form::password("new_password_confirmation", ['class'=>'form-control', "required"]) !!}
                </div>
            </div>

            <div class="form-group">
                <center>{!! Form::submit("Change Password", ['class'=>'btn btn-success']) !!}</center>
            </div>

            @include("errorList")
        </div>

        {!! Form::close() !!}
    </div>
@endsection

@section("title")
    <title>
        Change Password | Admin
    </title>
@endsection