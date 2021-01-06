@extends("admin.master")

@section("content")
    <h4 class="page-title">View Car</h4>

    <ol class="breadcrumb">
        <li><a href="{{ url($adminUrl) }}">Dashboard</a></li>
        <li><a href="{{ url("$adminUrl/cars") }}">Cars</a></li>
        <li class="active">{{ $car->title }}</li>
    </ol>

    <div class="card-box">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <center><img width="100%" height="auto" style="margin-right: 10px;" class="img-thumbnail" src="{{ $car->cover }}"></center>
            </div>
        </div>
    </div>

    <div class="card-box row">
        <div class="form-group">
            <div class="pull-right">
                <a class="btn btn-primary ml-auto" style="color:white;" href="{{ url("$adminUrl/cars/$car->id/edit") }}">
                    <span class="fa fa-edit"></span> Edit Car
                </a>
            </div>
            <h2 style="font-weight: bold;">Car Basic Information</h2>

            <h3>Creator: {!! ($car->creator != null) ? "<a href='".url("$adminUrl/admins/" . $car->creator->username) . "'>" . $car->creator->name . "</a>" : "" !!}</h3>
            <h3>Seller: <a href="{{ url("$adminUrl/clients/" . $car->client->username) }}">{{ $car->client->name }}</a></h3>
            <h3>Status: <span style="font-weight: bold; color:{{ $car->status->color }};">{{ $car->status->name }}</span></h3>
        </div>

    </div>

    <div class="card-box row">
        <div class="form-group">
            <h2 style="font-weight: bold;">Car Details</h2>

            <h3>Price: {{ $car->getField("price") }} <strong>L.E.</strong></h3>
            <h3>Category: {{ $car->getField("category_id")->name }}</h3>
            <h3>Type: {{ $car->getField("type_id")->name }}</h3>
            <h3>Edition: {{ $car->getField("edition_id")->name }}</h3>
            <h3>Octane: {{ $car->getField("octane_id")->name }}</h3>
            <h3>Location: {{ $car->getField("location_id")->name }}</h3>

        </div>
    </div>

    @foreach($sections as $section)
        @if($section->fields()->whereNotIn("name", \App\Models\Car\Car::$excluded)->exists())
            <div class="card-box row">
                <div class="form-group">
                    <h2 style="font-weight: bold;">{{ $section->name }}</h2>

                    @foreach($car->fields()->whereNotIn("name", \App\Models\Car\Car::$excluded)->where("section_id", $section->id)->get() as $field)
                        <h3>{{ ucfirst(str_replace("_", " ", $field->name)) }}: {{ $car->getField($field->name) }}</h3>
                    @endforeach
                </div>
            </div>
        @endif
    @endforeach

    <div class="card-box row">
        <h2 style="font-weight: bold;">Car Images</h2>
        <table class="table data-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
                </tr>
            </thead>

            <tbody>
            @foreach($car->images as $image)
                <tr>
                    <td>{{ $loop->index + 1 }}</td>
                    <td><img src="{{ $image->path }}" width="100px" height="100px" alt="..."></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

    @unless($car->getField("youtube") == "" || $car->getField("youtube") == null)
        <div class="card-box row">
            <h2 style="font-weight: bold;">Youtube Video</h2>

            <div class="col-lg-6">
                <iframe width="100%" height="450" src="{{ $car->getYoutubeEmbedUrl() }}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
        </div>
    @endunless

    @if($car->requests->count() > 0)
        <div class="card-box row">
            <h2 style="font-weight: bold;">User Requests</h2>

            <table class="table data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                    </tr>
                </thead>

                <tbody>
                    @foreach($car->requests as $request)
                        <tr>
                            <td>{{ $request->client->name }}</td>
                            <td>{{ $request->client->email }}</td>
                            <td>{{ $request->client->phone }}</td>
                            <td>{{ $request->message }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @include("admin.datatables")
    @endif
@endsection

@section("title")
    <title>View Car | Car Rental</title>
@endsection