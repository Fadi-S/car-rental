<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="{{ url("css/zaki.css") }}"/>
    <link rel="stylesheet" href="{{ url("bootstrap/css/bootstrap.min.css") }}">
    <link rel="stylesheet" href="{{ url("css/font-awesome-4.4.0/css/font-awesome.min.css") }}">
    <link rel="stylesheet" type="text/css" href="{{ url("css/animate.css") }}">
    <link href="{{ url("css/owl.carousel.css") }}" rel="stylesheet">
    <link href="{{ url("css/owl.theme.css") }}" rel="stylesheet">
    <script src="{{ url("js/jquery.min.js") }}"></script>
    @yield("title")
</head>
<body>
<!-------- Header -------->
<header>
    <div class="blue">
        <div class="container">
            <ul class="top_info">
                <li><i class="fa fa-phone"></i> +2 01277818581 /  01061418230</li>
                <li><i class="fa fa-map-marker"></i> Camp Shizar, Alexandria, Egypt</li>
                <li>
                    <ol><a href="#"><i class="fa fa-facebook"></i></a></ol>
                    <ol><a href="#"><i class="fa fa-instagram"></i></a></ol>
                    <ol><a href="#"><i class="fa fa-twitter"></i></a></ol>
                </li>
            </ul>

            @if(!auth()->check())
                <!-------- Login -------->
                <div class="Login">
                    <div class="link">
                        <a href="{{ url("/login") }}">SIGN IN</a>
                        <a href="{{ url("/register") }}">REGISTER</a>
                    </div>
                </div>
                <!-------- Login -------->
            @else
                <div class="Login">
                    <div class="link">
                        <form id="logout-form" action="{{ url("logout") }}" method="POST">
                            {{ csrf_field() }}
                            <a href="{{ url("/change-password") }}">CHANGE PASSWORD</a>
                            <a href="#" id="submit-logout">LOGOUT</a>
                        </form>
                    </div>
                </div>
                <script>
                    document.getElementById("submit-logout").onclick = function (e) {
                        e.preventDefault();
                        document.getElementById("logout-form").submit();
                    };
                </script>
            @endif
        </div>
        <div></div>
    </div>
    <div class="col-lg-12 bg-white">
        <div class="container">

            <!-------- logo -------->
            <div class="logo">
                <a href="{{ url("/") }}"><img alt="Logo" src="{{ url("images/zaki.png") }}" /></a>
            </div>
            <!-------- logo -------->

            <!-------- Menu -------->
            <div class="menu gradient-1">
                <nav class="nav">
                    <ul class="sf-menu">
                        <li><a href="{{ url("/") }}">Home</a></li>
                        <li><a href="{{ url("/about") }}">About Us</a></li>
                        <li><a href="{{ url("/cars") }}">Available Cars</a></li>
                        <li><a href="{{ url("/cars/sell") }}">Sell Car</a></li>
                        <li><a href="{{ url("/contact") }}">Contact us</a></li>
                    </ul>
                </nav>
            </div>
            <!-------- Menu -------->
        </div>
    </div>
    <div class="clear"></div>

    <!-------- Mobile Menu -------->
    <div class="nav_resp">
        <select id="" class="" onChange="window.location.href=this.value">
            <option value="{{ url("/") }}">Home</option>
            <option value="{{ url("/about") }}">About us</option>
            <option value="{{ url("/cars") }}">Available Cars</option>
            <option value="{{ url("/cars/sell") }}">Sell Car</option>
            <option value="{{ url("/contact") }}">Contact us</option>
        </select>
    </div>
    <!-------- Mobile Menu -------->
</header>
<!-------- Header -------->

@yield("content")
@include("flash")
<div class="clear"></div>
<!-------- footer -------->
<footer>
    <div class="container footer-data">
        <div class="col-lg-3">
            <div class="footer-widget">
                <h2>Menu</h2>
                <ul>
                    <li><a href="{{ url("/") }}">Home</a></li>
                    <li><a href="{{ url("/about") }}">About Us</a></li>
                    <li><a href="{{ url("/cars") }}">Available Cars</a></li>
                    <li><a href="{{ url("/cars/sell") }}">Sell Car</a></li>
                    <li><a href="{{ url("/contact") }}">Contact us</a></li>
                </ul>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="footer-widget">
                <h2>Ahmed Zaki cars</h2>
                <ul>
                    <li><a href="{{ url("/about") }}">About Us</a></li>
                    <li><a href="{{ url("/cars?type=latest") }}">Latest Cars</a></li>
                    <li><a href="{{ url("/about") }}">Zaki</a></li>
                </ul>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="footer-widget">
                <h2>NewsLetter</h2>
                <div class="input-group">
                    <input class="form-control" type="email" id="" name="" placeholder="your@email.com">
                    <a href="#" class="btn btn-danger">Subscribe</a>
                </div>
                <div class="footersocial">
                    <span>Follow Us:</span>
                    <div class="facebook"><a href="#"><i class="fa fa-facebook"></i></a></div>
                    <div class="twitter"><a href="#"><i class="fa fa-twitter"></i></a></div>
                    <div class="youtube"><a href="#"><i class="fa fa-instagram"></i></a></div>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="footer-widget">
                <h2>Contact us</h2>
                <p>
                    <span class="icon"><i class="fa fa-home"></i></span>
                    <span class="adress">You can find us:
                        <br>Ahmed Foaad Ur,
                        <br>Alexandria, Egypt
                    </span>
                </p>
                <p><span class="icon"><i class="fa fa-envelope"></i></span><span class="adress">info@ahmedzakicars.com</span></p>
            </div>
        </div>
    </div>
</footer>
<div class="copyright">
    <div class="container">
        <div class="left">Ahmedzakicars© 2018 • All Rights Reserved</div>
        <div class="right">Powered By <a href="#">Liberatedsystems</a></div>
    </div>
</div>
<!-------- footer -------->


<!-------- Script -------->
<script src="{{ url("bootstrap/js/bootstrap.min.js") }}"></script>
<script type="text/javascript" src="{{ url("js/jquery.waypoints.min.js") }}"></script>
<script type="text/javascript" src="{{ url("js/jquery.nivo.slider.js") }}"></script>
<script type="text/javascript">
    $(window).load(function() {
        $('#slider').nivoSlider();
    });
</script>
<!-------- Script -------->
</body>
</html>
