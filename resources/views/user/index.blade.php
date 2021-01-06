@extends("user.master")

@section("content")
<!-------- Banner -------->
<div class="fullwidth">
    <div id="wrapper">
        <div class="slider-wrapper theme-default">
            <div id="slider" class="nivoSlider">
                <img src="{{ url("images/slider/slide-1.jpg") }}"  alt="" />
                <img src="{{ url("images/slider/slide-2.jpg") }}"  alt="" />
                <img src="{{ url("images/slider/slide-3.jpg") }}"  alt="" />
            </div>
        </div>
    </div>
</div>
<!-------- End Banner -------->

<!--    <div class="col-lg-12">
        <div class="container">
            ------ Search ------
            <div class="search-box">
                <div class="search">
                    <input type="text" placeholder="I am looking for">
                    <a href="#" class="search-btn" value="Search"><i class="fa fa-search" aria-hidden="true"></i></a>
                </div>
            </div>
            ------ Search ------
        </div>
    </div>-->


<div class="col-lg-12">
    <div class="container">
        <!-------- welcome -------->
        <div class="welcome text-center">
            <h1 class="text-danger">Welcome to our website</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
        </div>
        <!-------- welcome -------->
    </div>
</div>


<div class="col-lg-12 available">
    <div class="row ">
        <!-------- available cars -------->
        <div class="container">
            <h3 class="availablecars triangle">Available Cars</h3>
            <div class="col-lg-12">
                @foreach($cars as $car)
                    <div class="col-lg-4 a_cars">
                        @unless($car->status_show == "")
                            <div class="theme-label-solid" style="background-color: {{ $car->status->color }}!important;"><span>{{ $car->status_show }}</span></div>
                        @endunless
                        <div><a href="{{ url("cars/$car->id/") }}" class="link" value=""><img src="{{ $car->cover }}"></a></div>
                        <div class="a_cars_info">
                            <div class="model"><span class=""><h5><a href="">{{ $car->getField("model") }}</a></h5></span></div>
                            <div class="year"><span class=""><h5><a href="">{{ $car->getField("year") }}</a></h5></span></div>
                        </div>
                    </div>
                @endforeach

            </div>
        </div>
        <!-------- available cars-------->
    </div>
</div>
@endsection

@section("title")
    <title>Ahmed Zaki Cars</title>
@endsection