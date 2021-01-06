@extends("user.master")

@section("content")

<div class="col-lg-12 signin">
    <div class="row">
        <div class="container">
            <div class="col-lg-12">
                <div class="sign">
                    <div class="text-center sell"><h1>Sell Car</h1></div>
                        <div class="signform">
                            <div class="fields">
                                <div class="box-round sellcheckbox">
                                    {!! Form::open(["method" => "POST", "url"=> url('/cars/sell'), 'files' => true]) !!}
                                        @if($errors->count())
                                            <div class="row card-box">
                                                @include("errorList")
                                            </div>
                                        @endif

                                        <p>
                                            <button type="submit" class="btn btn-block btn-success bold">
                                                Submit
                                            </button>
                                        </p>

                                        <div class="row form-group">
                                            <div class="col-md-12">
                                                {!! Form::label("coverImage" , 'Upload Cover') !!}
                                                <input type="file" name="coverImage" accept="image/*">
                                            </div>
                                        </div>

                                        <div class="row form-group">
                                            <div class="col-md-12">
                                                {!! Form::label("image" , 'Upload Multiple images') !!}
                                                <input type="file" name="files[]" multiple accept="image/*">
                                            </div>
                                        </div>

                                        <div class="col-lg-4">
                                            <div class="form-group">

                                                @if(auth()->user()->phone == null || auth()->user()->phone == 0)
                                                    <div class="form-group">
                                                        {!! Form::label("", "Phone Number *") !!}
                                                        <input name="phone" placeholder="Phone Number" type="number" class="form-control">
                                                    </div>
                                                @endif

                                                @if(auth()->user()->location_id == null || auth()->user()->location_id == 0)
                                                    <div class="form-group">
                                                        {!! Form::label("", "Your Location *") !!}
                                                        {!! Form::select("location_id", $locations, null, ["class" => "form-control", "id" => "input-icon"]) !!}
                                                    </div>
                                                @endif

                                                <div class="form-group">
                                                    {!! Form::label("", "Car Location *") !!}
                                                    {!! Form::select("fields[location_id]", $locations, null, ["class" => "form-control", "id" => "input-icon"]) !!}
                                                </div>

                                                <div class="form-group">
                                                    {!! Form::label("", "Category *") !!}
                                                    {!! Form::select("fields[category_id]", $categories, null, ["class" => "form-control", "id" => "input-icon"]) !!}
                                                </div>

                                                <div class="form-group">
                                                    {!! Form::label("", "Type *") !!}
                                                    {!! Form::select("fields[type_id]", $types, null, ["class" => "form-control", "id" => "input-icon"]) !!}
                                                </div>

                                                <div class="form-group">
                                                    {!! Form::label("", "Edition *") !!}
                                                    {!! Form::select("fields[edition_id]", $editions, null, ["class" => "form-control", "id" => "input-icon"]) !!}
                                                </div>

                                                <div class="form-group">
                                                    {!! Form::label("", "Octane *") !!}
                                                    {!! Form::select("fields[octane_id]", $octanes, null, ["class" => "form-control", "id" => "input-icon"]) !!}
                                                </div>

                                                <div class="input-icon">
                                                    {!! Form::label("", "Price *") !!}
                                                    {!! Form::number("fields[price]", null, ["class" => "form-control", "placeholder" => "Price", "min"=>"1"]) !!}
                                                </div>

                                                <div class="input-icon">
                                                    {!! Form::label("", "Youtube Link") !!}
                                                    {!! Form::text("fields[youtube]", null, ["class" => "form-control", "placeholder" => "Youtube"]) !!}
                                                </div>

                                            </div>
                                        </div>
                                        @foreach($sections as $section)
                                            @if($section->fields()->exists())
                                                <div class="col-lg-8">
                                                    <div class="row features">
                                                        <h2 class="text-center">{{ $section->name }}</h2>
                                                        @foreach($section->fields as $field)
                                                            @unless(in_array($field->name, \App\Models\Car\Car::$excluded))
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        {!! Form::label($field->id, ucfirst(str_replace("_", " ", $field->name)), ['class'=>'peers peer-greed js-sb ai-c']) !!}
                                                                        {!! Form::text("fields[$field->name]", null,
                                                                        ["class" => "form-control", "id" => $field->id."__input", "placeholder" => ucfirst(str_replace("_", " ", $field->name))]) !!}
                                                                    </div>
                                                                </div>
                                                            @endunless
                                                        @endforeach
                                                    </div>
                                                </div>
                                                <p>
                                                    <button type="submit" class="btn btn-block btn-success bold">
                                                        Submit
                                                    </button>
                                                </p>
                                                <div class="clear"></div>
                                            @endif

                                        @endforeach
                                    {!! Form::close() !!}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection

@section("title")
    <title>
        Ahmed Zaki Cars
    </title>
@endsection