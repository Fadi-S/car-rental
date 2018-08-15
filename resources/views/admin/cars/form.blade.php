<div class="card-box">

    <div class="row">
        <div class="form-group col-md-6">
            {!! Form::label("category_id", "Car Category *") !!}
            {!! Form::select("category_id", $categories, null, ["class" => "form-control"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("type_id", "Car Type *") !!}
            {!! Form::select("type_id", $types, null, ["class" => "form-control"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("edition_id", "Car Edition *") !!}
            {!! Form::select("edition_id", $editions, null, ["class" => "form-control"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("octane_id", "Car Octane *") !!}
            {!! Form::select("octane_id", $octanes, null, ["class" => "form-control"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("location_id", "Car Location *") !!}
            {!! Form::select("location_id", $locations, null, ["class" => "form-control"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("price", "Car Price *") !!}
            {!! Form::number("price", null, ["class" => "form-control", "placeholder" => "Price", "min"=>"1"]) !!}
        </div>
    </div>

    <div class="col-md-12">
        @foreach($fields as $field)
            <div class="row">
                <div class="form-group col-md-2">
                    <div class="peer">
                        <div class="checkbox checkbox-rectangle checkbox-info peers ai-c">
                            {!! Form::checkbox($field."__checkbox", 1, (($create) ? false : ($car[$field] != "") ), ['class'=>'peer', "id"=>$field]) !!}
                            {!! Form::label($field."__checkbox", ucfirst(str_replace("_", " ", $field)), ['class'=>'peers peer-greed js-sb ai-c']) !!}
                        </div>
                    </div>
                </div>

                <div class="form-group col-md-6">
                    {!! Form::text($field, null,
                    ["class" => "form-control", "id" => $field."__input", "placeholder" => ucfirst(str_replace("_", " ", $field)), (($create) ? "disabled" : ($car[$field] == "") ? "disabled" : "" )]) !!}
                </div>
            </div>
        @endforeach

            <script>
                $("input[name$=__checkbox]").change(function() {
                    $("#" + $(this).prop("id") + "__input").prop("disabled", !$(this).prop('checked'));
                });
            </script>
    </div>

    <center>{!! Form::submit($submit, ["class"=>"btn btn-success"]) !!}</center>

    @include("errorList")
</div>