@extends("admin.master")

@section("content")
        
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
                <h2 style="font-weight: bold;">Basic Information</h2>

                <h3>Creator: <a href="{{ url("$adminUrl/admins/" . $car->creator()->username) }}">{{ $car->creator()->name }}</a></h3>
                <h3>Seller: {{ $car->client->name }}</h3>
                <h3>Status: <span style="font-weight: bold; color:{{ $car->status->color }};">{{ $car->status->name }}</span></h3>
            </div>

        </div>    

        <div class="card-box row">
            <div class="form-group">                
                    <h2 style="font-weight: bold;">Car details</h2>
                    <h3>Price: {{ $car->price }} <strong>L.E.</strong></h3>
                    <h3>Category: {{ $car->category->name }}</h3>
                    <h3>Type: {{ $car->type->name }}</h3>
                    <h3>Edition: {{ $car->edition->name }}</h3>
                    <h3>Octane: {{ $car->octane->name }}</h3>
                    <h3>Location: {{ $car->location->name }}</h3>

                    @foreach($fields as $field)
                        @if($car[$field])
                            <h3>
                                {{ ucfirst(str_replace("_", " ", $field)) }}: {{ $car[$field] }}
                            </h3>
                        @endif
                    @endforeach
                </div>
            </div>

         <div class="card-box row">
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
@endsection

@section("title")
    <title>View Car | Car Rental</title>
@endsection