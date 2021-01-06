@extends("user.master")

@section("content")

    <div class="col-lg-12 contact">
        <div class="row">
            <div class="breadcrumb-blog">
                <h3>Contact Information</h3>
            </div>
        </div>
    </div>
    <div class="col-lg-12 contact">
        <div class="container">
            <div class="col-lg-6">
                <h1>Send Us Message</h1>
                <form id="contact-form" action="{{ url("/contact") }}" method="POST">
                    {!! csrf_field() !!}
                    <div><input placeholder="Name" name="name" type="text"></div>
                    <div><input placeholder="Email" name="email" type="text"></div>
                    <div><input placeholder="Phone" name="phone" type="text"></div>
                    <div>
                        <textarea placeholder="Message" name="message"></textarea>
                        <input type="submit" value="Send" class="btn btn-danger">
                        <br><br>
                    </div>
                </form>
            </div>
            <div class="col-lg-6">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3412.9021559399166!2d29.90639561458508!3d31.195726181478253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5c394903c532b%3A0x404e659d0b216891!2sLiberated+Systems!5e0!3m2!1sen!2seg!4v1539005027513" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
        </div>
    </div>
    <div class="clear"></div>
    <div class="contactinfo">
        <div class="col-lg-12">
            <div class="contact-info contact-section container">
                <div class="col-lg-4">
                    <div><i class="fa fa-map-marker"></i></div>
                    <div>
                        <p>Location:</p>
                        <p>Ahmed Foaad Ur, Alexandria, Egypt</p>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div><i class="fa fa-mobile"></i></div>
                    <div>
                        <p>Phone:</p>
                        <p>01277818581<br>01061418230</p>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div><i class="fa fa-envelope"></i></div>
                    <div>
                        <p>Email:</p>
                        <p>contact@ahmedzakicars.com</p>
                    </div>
                </div>
            </div>
        </div>
@endsection

@section("title")
    <title>Ahmed Zaki Cars</title>
@endsection