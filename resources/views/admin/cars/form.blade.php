@if($errors->count())
    <div class="row card-box">
        @include("errorList")
    </div>
@endif
<div class="row card-box">

        <div class="form-group col-md-6">
            <label class="control-label">Cover Image *</label>

            <input type="file" class="filestyle" data-iconname="fa fa-cloud-upload" id="filestyle-6"
                   tabindex="-1" style="position: absolute; clip: rect(0px, 0px, 0px, 0px);" name="coverImage" accept="image/*">

            <div class="bootstrap-filestyle input-group">
                <span class="group-span-filestyle" tabindex="0">
                    <label for="filestyle-6" class="btn btn-default">
                        <span class="icon-span-filestyle glyphicon glyphicon-folder-open"></span> <span class="buttonText">Upload Cover Photo</span>
                    </label>
                </span>
            </div>
        </div>

        @if($car->getOriginal('cover'))
            <div class="form-group col-md-6">
            {!! Form::label("cover" , 'Current Cover') !!}
                <img src="{{ $car->cover }}" width="450px" height="150px" alt="...">
            </div>
        @endif

</div>

<div class="row card-box">
    <div class="row form-group">
            <div class="col-md-12">
                {!! Form::label("image" , 'Upload Multiple images') !!}
                <input type="file" name="files[]" multiple accept="image/*">
            </div>
    </div>

    @if(!$car->images->isEmpty())

        <div class="row form-group">
            <div class="col-md-12">
            <table class="table data-table">
            <thead>
            <tr>
                <th>Image</th>
                <th>Edit</th>
                <th>delete</th>
            </tr>
            </thead>

            <tbody>
            @foreach($car->images as $image)
                <tr>
                    <td><img src="{{ $image->path }}" width="100px" height="100px" alt="..."></td>
                    <td><a href="" class="btn btn-primary">Edit</a></td>
                    <td><a href="" class="btn btn-danger">delete</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
            </div>

       </div> 

    @endif

</div>

<div class="row card-box">

    <h3>Car Details</h3>
    <div class="row">
        <div class="form-group col-md-6">
            {!! Form::label("fields[category_id]", "Car Category *") !!}
            {!! Form::select("fields[category_id]", $categories, (!$create) ? $car->getField("category_id")->id : null, ["class" => "form-control"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("fields[type_id]", "Car Type *") !!}
            {!! Form::select("fields[type_id]", $types, (!$create) ? $car->getField("type_id")->id : null, ["class" => "form-control"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("fields[edition_id]", "Car Edition *") !!}
            {!! Form::select("fields[edition_id]", $editions, (!$create) ? $car->getField("edition_id")->id : null, ["class" => "form-control"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("fields[octane_id]", "Car Octane *") !!}
            {!! Form::select("fields[octane_id]", $octanes, (!$create) ? $car->getField("octane_id")->id : null, ["class" => "form-control"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("fields[location_id]", "Car Location *") !!}
            {!! Form::select("fields[location_id]", $locations, (!$create) ? $car->getField("location_id")->id : null, ["class" => "form-control"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("fields[price]", "Car Price *") !!}
            {!! Form::number("fields[price]", (!$create) ? $car->getField("price") : null, ["class" => "form-control", "placeholder" => "Price", "min"=>"1"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("client_id", "Seller *") !!}
            {!! Form::select("client_id", $clients, null, ["class" => "form-control"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("status_id", "Status *") !!}
            {!! Form::select("status_id", $statuses, null, ["class" => "form-control"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("fields[youtube]", "Youtube") !!}
            {!! Form::text("fields[youtube]", (!$create) ? $car->getField("youtube") : null, ["class" => "form-control", "placeholder" => "Youtube"]) !!}
        </div>
    </div>
    <center>{!! Form::submit($submit, ["class"=>"btn btn-success"]) !!}</center>
</div>

<div class="row card-box">
    <div class="col-md-12">
        @foreach($sections as $section)
            @if($section->fields()->exists())
                <h3>{{ $section->name }}</h3>
                @foreach($section->fields as $field)
                    @unless(in_array($field->name, \App\Models\Car\Car::$excluded))
                        <div class="row">
                            <div class="form-group col-md-2">
                                <div class="peer">
                                    <div class="checkbox checkbox-rectangle checkbox-info peers ai-c">
                                        {!! Form::checkbox($field->id."__checkbox", 1, (($create) ? false : ($car[$field->id] != "") ), ['class'=>'peer', "id"=>$field->id]) !!}
                                        {!! Form::label($field->id, ucfirst(str_replace("_", " ", $field->name)), ['class'=>'peers peer-greed js-sb ai-c']) !!}
                                    </div>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                {!! Form::text("fields[$field->name]", (!$create) ? $car->getField($field->name) : null,
                                ["class" => "form-control", "id" => $field->id."__input", "placeholder" => ucfirst(str_replace("_", " ", $field->name)), (($create) ? "disabled" : ($car[$field->id] == "") ? "disabled" : "" )]) !!}
                            </div>
                        </div>
                    @endunless
                @endforeach
            @endif
            <br>
        @endforeach

            <script>
                $("input[name$=__checkbox]").change(function() {
                    $("#" + $(this).prop("id") + "__input").prop("disabled", !$(this).prop('checked'));
                });
            </script>
    </div>
</div>