@if($cars->count() > 0)
    <div class="most_viewed">
        <div class="col-lg-12">
            <div class="container">
                <h3 class="page-header">Most Viewed</h3>

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
    </div>
@endif