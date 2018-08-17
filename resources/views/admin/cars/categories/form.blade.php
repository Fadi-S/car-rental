<div class="card-box">

    <div class="row">
        <div class="form-group col-md-6">
            {!! Form::label("name", "Name *") !!}
            {!! Form::text("name", null, ["class" => "form-control", "placeholder"=>"Name"]) !!}
        </div>
    </div>

    <center>{!! Form::submit($submit, ["class"=>"btn btn-success"]) !!}</center>

    @include("errorList")
</div>