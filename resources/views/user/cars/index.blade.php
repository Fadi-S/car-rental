@extends("user.master")

@section("content")

    <div class="col-lg-12 bg-white">
        @include("user.cars.search")
    </div>

    <div class="col-lg-12 available">
        <div class="row">
            <!-------- available cars -------->
            <div class="container">
                <h3 class="availablecars triangle">Available Cars</h3>
                <div class="col-lg-12">

                    @if($cars->count() == 0)
                        <div class="alert alert-danger alert-normal">
                            Could not find any car
                        </div>
                    @endif
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

                    <div class="clear"></div>
                    <div class="text-center">
                        {{ $cars->links() }}
                        <!-- <ul class="pagination">
                            <li class="active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                        </ul> -->
                    </div>
                    <hr/>
                </div>
            </div>
            <!-------- available cars-------->
        </div>
    </div>

    @include("user.cars.mostViewed")
@endsection

@section("title")
    <title>Ahmed Zaki Cars</title>
@endsection