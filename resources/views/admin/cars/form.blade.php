
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

        <div class="form-group col-md-6">
            {!! Form::label("client_id", "Seller *") !!}
            {!! Form::select("client_id", $clients, null, ["class" => "form-control"]) !!}
        </div>

        <div class="form-group col-md-6">
            {!! Form::label("status_id", "Status *") !!}
            {!! Form::select("status_id", $statuses, null, ["class" => "form-control"]) !!}
        </div>

           

    <div class="col-md-12">
        @foreach($fields as $field)
            <div class="row">
                <div class="form-group col-md-2">
                    <div class="peer">
                        <div class="checkbox checkbox-rectangle checkbox-info peers ai-c">
                            {!! Form::checkbox($field."__checkbox", 1, (($create) ? false : ($car[$field] != "") ), ['class'=>'peer', "id"=>$field]) !!}
                            {!! Form::label($field, ucfirst(str_replace("_", " ", $field)), ['class'=>'peers peer-greed js-sb ai-c']) !!}
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