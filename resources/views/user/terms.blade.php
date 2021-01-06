@extends("user.master")

@section("content")

    <div class="col-lg-12 about">
        <div class="row">
            <div class="breadcrumbs-custom-inset">
                <div class="breadcrumbs-custom context-dark bg-overlay-60">
                    <div class="container">
                        <h2 class="breadcrumbs-custom-title">Terms and Conditions</h2>
                    </div>
                    <div class="box-position" style="background-image: url({{ url('images/bg-about.jpg') }});"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="clear"></div>

    <div class="col-lg-12 aboutus">
        <div class="container">
            <div class="col-lg-6">
                <h1>Ahmed Zaki Cars Terms and Conditions</h1>
                <p>Lorem ipsum dolor sit amet, consectetur elit. Ad assumenda fuga illo laudantium magni sed temporibus fuga illo laudantium. Habitasse lobortis cum malesuada nullam cras odio venenatis nisl at turpis sem in porta consequat massa a mus massa nascetur elit vestibulum.</p>

                <p>Habitasse lobortis cum malesuada nullam cras odio venenatis nisl at turpis sem in porta consequat massa a mus massa nascetur elit vestibulum. Lorem ipsum dolor sit amet, consectetur elit. Ad assumenda fuga illo laudantium magni sed temporibus fuga illo laudantium.</p>
            </div>

            <div class="col-lg-6">
                <figure><img src="images/product-lunch.png"></figure>
            </div>
        </div>
    </div>

@endsection

@section("title")
    <title>Ahmed Zaki Cars</title>
@endsection