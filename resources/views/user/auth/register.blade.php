@extends("user.master")

@section("content")
<div class="col-lg-12 signin">
    <div class="row">
        <div class="container">
            <div class="col-lg-12">
                <div class="col-lg-4 sign float-none">
                    <div class="text-center"><h1>Sign Up</h1></div>
                    <div class="signform">
                        <div class="fields">
                            <form action="{{ url('/register') }}" method="POST">
                                {!! csrf_field() !!}
                                <div class="box-round">
                                    <div class="loginfb"><a href=""><img src="{{ url("images/co-fb.png") }}" /></a></div>
                                    <div class="form-group">
                                        <div class="input-icon">
                                            <div class="icon"><i class="fa fa-user"></i></div>
                                            <input name="name" value="{{ old("name") }}" type="name" class="form-control" placeholder="Name">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-icon">
                                            <div class="icon"><i class="fa fa-envelope"></i></div>
                                            <input name="email" value="{{ old("email") }}" type="email" class="form-control" placeholder="E-mail">
                                        </div>
                                    </div>


                                    <!-- Password form -->
                                    <div class="form-group">
                                        <div class="input-icon">
                                            <div class="icon"><i class="fa fa-lock"></i></div>
                                            <input name="password" type="password" class="form-control" id="" placeholder="Password">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-icon">
                                            <div class="icon"><i class="fa fa-lock"></i></div>
                                            <input name="password_confirmation" type="password" class="form-control" placeholder="Confirm Password">
                                        </div>
                                    </div>
                                    <!-- End password form -->

                                    <div class="checkbox">
                                        <label class="pi-small-text">
                                            <input value="1" name="terms" type="checkbox">I agree to the <a href="{{ url("/terms") }}" class="text-success">Terms of Use</a>
                                        </label>
                                    </div>

                                    @include("errorList")

                                    <p>
                                        <button type="submit" class="btn btn-block btn-success">
                                            Create An Account
                                        </button>
                                    </p>
                                </div>
                                <p class="text-center">
                                    Have an Account? <a href="{{ url("/login") }}" class="text-danger bold">Sign In</a>
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