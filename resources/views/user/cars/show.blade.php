@extends("user.master")

@section("content")

    <div class="col-lg-12 bg-white">
        @include("user.cars.search")

        <div class="row ">
            <div class="fullwidthimg">
                <img src="{{ $car->cover }}" />
            </div>
        </div>
    </div>
    <div class="col-lg-12 bg-white">
        <div class="container">

            <div class="car-info-details">
                <div class="col-lg-4">
                    <div class="title"><span>Car Code</span><span>{{ $car->serial }}</span></div>
                    <div class="title"><span>Brand</span><span>{{ $car->getField("brand") }}</span></div>
                    <div class="title"><span>Model</span><span>{{ $car->getField("model") }}</span></div>
                    <div class="title"><span>Year</span><span>{{ $car->getField("year") }}</span></div>
                </div>

                <div class="col-lg-4">
                    <div class="title"><span>Category</span><span>{{ $car->getField("category_id")->name }}</span></div>
                    <div class="title"><span>Type</span><span>{{ $car->getField("type_id")->name }}</span></div>
                    <div class="title"><span>Edition</span><span>{{ $car->getField("edition_id")->name }}</span></div>
                    <div class="title"><span>Octane</span><span>{{ $car->getField("octane_id")->name }}</span></div>
                </div>

                <div class="col-lg-4">
                    <div class="priceinfo"><span>Price</span><span>{{ $car->getField("price") }} LE</span></div>
                    <div class="title"><span>Commission </span><span>1%</span></div>
                    <div class="title"><span>Location</span><span>{{ $car->getField("location_id")->name }}</span></div>
                    <div class="soc">
                        <div class="footersocial">
                            <div class="facebook"><a href="#"><i class="fa fa-facebook"></i></a></div>
                            <div class="twitter"><a href="#"><i class="fa fa-twitter"></i></a></div>
                            <div class="youtube"><a href="#"><i class="fa fa-instagram"></i></a></div>
                        </div>
                        @unless(auth()->check())
                            <div class="addfavorites"><a href="#"><i class="fa fa-heart"></i> Add to favorites</a></div>
                        @endunless
                    </div>
                </div>
            </div>
            <!-------- end car-info-details -------->
        </div>
    </div>

    <div class="col-lg-12 available allgallery">
        <div class="container">
            @unless($car->getField("youtube") == "" || $car->getField("youtube") == null)
                <div class="col-lg-6">
                    <iframe width="100%" height="320" src="{{ $car->getYoutubeEmbedUrl() }}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
            @endunless

            <div class="col-lg-6">

                <div class="all_imgs">
                    <div class="list-group gallery">
                        @foreach($car->images as $image)
                            <div class="col-lg-3 portfolio-item-inner">
                                <a class="thumbnail fancybox" rel="ligthbox" href="{{ $image->path }}">
                                    <img class="img-responsive" alt="" src="{{ $image->path }}">
                                </a>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-12 bg-white">
        <div class="container">
            <div class="col-lg-12">
                <div class="specs">
                    @foreach($sections as $section)
                        @if($section->fields()->whereNotIn("name", \App\Models\Car\Car::$excluded)->exists())
                            <div class="col-lg-4">
                                <h1>{{ $section->name }}</h1>
                                <ul>
                                    @foreach($car->fields()->whereNotIn("name", \App\Models\Car\Car::$excluded)->where("section_id", $section->id)->get() as $field)
                                    <li><i class="fa fa-check-square"></i> {{ ucfirst(str_replace("_", " ", $field->name)) }}: {{ $car->getField($field->name) }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                    @endforeach
                </div>


                <div class="send_request">
                    <div class="send_title col-lg-2">Send Request</div>
                    @if($car->status->name != "Sold")
                    <form id="send-request-form" action="{{ url("/cars/$car->id/request") }}" method="POST">
                        {!! csrf_field() !!}
                        @if(auth()->check())
                            @if($request->count() > 0)
                                <div class="send_field col-lg-8">
                                    <div class="alert alert-success alert-normal">
                                        Request was submitted and an admin will contact you as soon as possible
                                    </div>
                                    @if($request->first()->message)
                                        <div class="alert alert-info alert-normal">
                                            {{ $request->first()->message }}
                                        </div>
                                    @endif
                                </div>
                                <input type="hidden" name="cancel" value="true">
                                <a id="send-request-btn" href="#"><div style="background-color: #ff3a3d;" class="send_btn col-lg-2">Cancel Request</div></a>
                                <script>
                                    document.getElementById("send-request-btn").onclick = function (e) {
                                        e.preventDefault();
                                        document.getElementById("send-request-form").submit();
                                    };
                                </script>
                            @else
                                <div class="send_field col-lg-8">
                                    <div class="col-lg-6">
                                        @if(auth()->user()->phone == null || auth()->user()->phone == 0)
                                            <div class="form-group row">
                                                <label class="col-sm-5 col-form-label">Phone Number</label>
                                                <div class="col-sm-7">
                                                    <input name="phone" placeholder="Phone Number" type="number" class="form-control">
                                                </div>
                                            </div>
                                        @endif

                                        <div class="form-group row">
                                            <label class="col-sm-5 col-form-label">Message</label>
                                            <div class="col-sm-7">
                                                <textarea name="message" placeholder="Message"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        @if(auth()->user()->location_id == null || auth()->user()->location_id == 0)
                                            <div class="form-group row">
                                                <label class="col-sm-5 col-form-label">Location</label>
                                                <div class="col-sm-7">
                                                    {!! Form::select("location_id", $locations, null, ["class" => "form-control"]) !!}
                                                </div>
                                            </div>
                                        @endif

                                        @if(auth()->user()->area_id == null || auth()->user()->area_id == 0)
                                            <div class="form-group row">
                                                <label class="col-sm-5 col-form-label">Area</label>
                                                <div class="col-sm-7">
                                                    {!! Form::select("area_id", $areas, null, ["class" => "form-control"]) !!}
                                                </div>
                                            </div>
                                        @endif
                                    </div>
                                </div>
                                <a id="send-request-btn" href="#"><div class="send_btn col-lg-2">Send</div></a>
                                <script>
                                    document.getElementById("send-request-btn").onclick = function (e) {
                                        e.preventDefault();
                                        document.getElementById("send-request-form").submit();
                                    };
                                </script>
                            @endif
                        @else
                            <div class="send_field col-lg-8">
                                <div class="col-lg-6">
                                    <div class="form-group row">
                                        <label class="col-sm-5 col-form-label">Name</label>
                                        <div class="col-sm-7">
                                            <input name="name" placeholder="Name" type="Name" class="form-control">
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-5 col-form-label">Email</label>
                                        <div class="col-sm-7">
                                            <input name="email" placeholder="Email" type="email" class="form-control">
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-5 col-form-label">Location</label>
                                        <div class="col-sm-7">
                                            {!! Form::select("location_id", $locations, null, ["class" => "form-control"]) !!}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">

                                    <div class="form-group row">
                                        <label class="col-sm-5 col-form-label">Phone Number</label>
                                        <div class="col-sm-7">
                                            <input name="phone" placeholder="Phone Number" type="number" class="form-control">
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-sm-5 col-form-label">Message</label>
                                        <div class="col-sm-7">
                                            <textarea name="message" placeholder="Message"></textarea>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <a id="send-request-btn" href="#"><div class="send_btn col-lg-2">Send</div></a>
                            <script>
                                document.getElementById("send-request-btn").onclick = function (e) {
                                    e.preventDefault();
                                    document.getElementById("send-request-form").submit();
                                };
                            </script>
                        @endif
                    </form>
                    @else
                        <div class="send_field col-lg-10 text-center bold">
                            <div class="alert alert-danger alert-normal">
                                This car was sold!
                            </div>
                        </div>
                    @endif
                </div>

            </div>
        </div>
    </div>

    @include("user.cars.mostViewed")

@endsection

@section("title")
    <title>
        Ahmed Zaki Cars
    </title>
@endsection