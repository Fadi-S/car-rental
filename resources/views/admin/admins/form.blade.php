<div class="card-box">

    <div class="row">
        <div class="form-group col-md-6">
            {!! Form::label("name", "Name *") !!}
            {!! Form::text("name", null, ["class" => "form-control", "placeholder" => "Name"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("email", "Email *") !!}
            {!! Form::email("email", null, ["class" => "form-control", "placeholder" => "Email"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("phone", "Phone *") !!}
            {!! Form::text("phone", null, ["class" => "form-control", "placeholder" => "Phone"]) !!}
        </div>

        @if($create)
            <div class="form-group col-md-6">
                {!! Form::label("password", "Password *") !!}
                {!! Form::password("password", ["class" => "form-control", "placeholder" => "Password"]) !!}
            </div>
        @endif

        <div class="form-group col-md-6">
            {!! Form::label("location_id", "Location *") !!}
            {!! Form::select("location_id", $locations, null, ["class" => "form-control"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("role_id", "Role *") !!}
            {!! Form::select("role_id", $roles, null, ["class" => "form-control"]) !!}
        </div>
    </div>

    <center>{!! Form::submit($submit, ["class"=>"btn btn-success"]) !!}</center>

    @include("errorList")
</div>