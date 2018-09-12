@extends("admin.master")

@section("content")
    <div class="card-box col-md-12">
        <a class="btn btn-success" style="color:white;" data-toggle="modal" data-target="#sold">
            <span class="fa fa-dollar"></span> Sold
        </a>
        <div class="modal fade" id="sold">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <strong style="align-content: center; text-align: center; font-size: 15px;">Sold</strong>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    {!! Form::open(['method'=>'PATCH', 'url'=>url($adminUrl . '/cars/' . $car->id)]) !!}
                    <div class="modal-body">
                        For how much was this car sold?
                        <input type="number" min="0" name="price" class="form-control">
                        <input type="hidden" name="status_id" value="{{ \App\Models\Status\Status::where("name", "Sold")->first()->id }}">
                    </div>
                    <div class="modal-footer">
                        <div class="mx-auto">
                            <button class="btn btn-success" type="submit">Submit</button>&nbsp;
                            <button class="btn btn-info" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>

        <center><img width="20%" height="auto" class="img-thumbnail" src="{{ $car->cover }}"></center>

        <center class="mx-auto">
            <h3>
                Admin: <a href="{{ url("$adminUrl/admins/" . $car->creator()->username) }}">{{ $car->creator()->name }}</a>
            </h3>

            <h3>
                Seller: {{ $car->client->name }}
            </h3>

            <h3>
                Status: <span style="font-weight: bold; color:{{ $car->status->color }};">{{ $car->status->name }}</span>
            </h3>

            <h3>
                Price: {{ $car->price }} L.E.
            </h3>

            <h3>
                Location: {{ $car->location->name }}
            </h3>

        </center>
    </div>
@endsection

@section("title")
    <title>View Car | Car Rental</title>
@endsection