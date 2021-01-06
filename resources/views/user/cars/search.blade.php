
<div class="container">
    <div class="search">
        <form method="GET" action="{{ url("/cars") }}">
            <div class="search gradient-1">
                <h2>Search</h2>
                <div class="col-lg-6">

                    <div class="brand">
                        <label for="" class="">Category</label>
                    </div>
                    <div class="brand-se">
                        {!! Form::select("category_id", $categories) !!}
                    </div>

                    <div class="brand">
                        <label for="" class="">Type</label>
                    </div>
                    <div class="brand-se">
                        {!! Form::select("type_id", $types) !!}
                    </div>

                    <div class="brand">
                        <label for="" class="">Edition</label>
                    </div>
                    <div class="brand-se">
                        {!! Form::select("edition_id", $editions) !!}
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="brand">
                        <label for="" class="">Octane</label>
                    </div>
                    <div class="brand-se">
                        {!! Form::select("octane_id", $octanes) !!}
                    </div>

                    <div class="brand">
                        <label for="" class="">Location</label>
                    </div>
                    <div class="brand-se">
                        {!! Form::select("location_id", $locations) !!}
                    </div>

                    <div class="price">
                        <label for="" class="">Price</label>
                    </div>
                    <div class="price-ch">
                        <div class="col-sm-6">
                            <input name="lowest_price" type="text" value="{{ request("lowest_price") }}" placeholder="From">
                        </div>
                        <div class="col-sm-6">
                            <input name="highest_price" type="text" value="{{ request("highest_price") }}" placeholder="To">
                        </div>
                    </div>
                </div>

                <div class="col-lg-12 center">
                    <div class="search_btn">
                        <a href="{{ Request::url() }}" class="btn btn-success btn-lg">Reset</a>
                        <button type="submit" class="btn btn-default btn-lg" value="Search">Search</button>
                    </div>
                </div>
            </div>
        </form>

        <!-------- search -------->
    </div>
</div>