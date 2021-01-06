@extends("user.master")

@section("content")
    <div class="col-lg-12 signin">
        <div class="row">
            <div class="container">
                <div class="col-lg-12">
                    <div class="col-lg-4 sign float-none">
                        <div class="text-center"><h1>Sign In</h1></div>
                        <div class="signform">
                            <div class="fields">
                                <form action="{{ url('/login') }}" method="POST">
                                    {!! csrf_field() !!}
                                    <div class="box-round">
                                        <div class="loginfb"><img src="{{ url("images/login-fb.png") }}" /></div>
                                        <div class="form-group">
                                            <div class="input-icon">
                                                <div class="icon"><i class="fa fa-envelope"></i></div>
                                                <input type="email" name="email" value="{{ old("email") }}" class="form-control" id="exampleInputEmail" placeholder="E-mail">
                                            </div>
                                        </div>
                                        <!-- End email form -->

                                        <!-- Password form -->
                                        <div class="form-group">
                                            <div class="input-icon">
                                                <div class="icon"><i class="fa fa-lock"></i></div>
                                                <input type="password" class="form-control" name="password" id="" placeholder="Password">
                                            </div>
                                        </div>
                                        <!-- End password form -->

                                        <div class="checkbox">
                                            <label class="pi-small-text">
                                                <input value="1" type="checkbox" {{ (old("remember")) ? "checked" : "" }} name="remember">Remember me
                                            </label>
                                        </div>

                                        @include("errorList")

                                        <p>
                                            <button type="submit" class="btn btn-block btn-success">
                                                Sign In
                                            </button>
                                        </p>
                                    </div>
                                    <p class="bo-small-text">
                                        <a href="{{ url('/password/reset') }}">
                                            Forgot password?
                                        </a>
                                    </p>
                                    <p class="text-center">
                                        Don't have Account? <a href="{{ url('/register') }}" class="text-primary bold">Sign Up</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section("title")
    <title>Ahmed Zaki Cars</title>
@endsection