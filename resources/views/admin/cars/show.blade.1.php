@extends("admin.master")

@section("content")
    <div class="card-box col-md-12">
        <div class="row">
            <div class="col-md-6">
                <a class="btn btn-info ml-auto" style="color:white;" href="{{ url("$adminUrl/cars/$car->id/edit") }}">
                    <span class="fa fa-edit"></span> Edit
                </a>
            </div>
        </div>

        <br>

        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-3">
                <center><img width="100%" height="auto" style="margin-right: 10px;" class="img-thumbnail" src="{{ $car->cover }}"></center>
            </div>
            <div style="margin-left: 20px;">
                <h3>Creator: <a href="{{ url("$adminUrl/admins/" . $car->creator()->username) }}">{{ $car->creator()->name }}</a></h3>
                <h3>Seller: {{ $car->client->name }}</h3>
                <h3>Status: <span style="font-weight: bold; color:{{ $car->status->color }};">{{ $car->status->name }}</span></h3>

                <hr>

                <h2 style="font-weight: bold; text-decoration: underline;">Car Information</h2>

                <h3>Price: {{ $car->price }} <strong>L.E.</strong></h3>
                <h3>Category: {{ $car->category->name }}</h3>
                <h3>Type: {{ $car->type->name }}</h3>
                <h3>Edition: {{ $car->edition->name }}</h3>
                <h3>Octane: {{ $car->octane->name }}</h3>
                <h3>Location: {{ $car->location->name }}</h3>

                <hr>

                @foreach($fields as $field)
                    @if($car[$field])
                        <h3>
                            {{ ucfirst(str_replace("_", " ", $field)) }}: {{ $car[$field] }}
                        </h3>
                    @endif
                @endforeach
            </div>
        </div>
    </div>
@endsection

@section("title")
    <title>View Car | Car Rental</title>
@endsection