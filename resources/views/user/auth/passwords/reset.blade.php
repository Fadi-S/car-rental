@extends("user.master")

@section("content")
    <div class="col-lg-12 signin">
        <div class="row">
            <div class="container">
                <div class="col-lg-12">
                    <div class="col-lg-4 sign float-none">
                        <div class="text-center"><h1>Change Password</h1></div>
                        <div class="signform">
                            <div class="fields">
                                <form action="{{ url('/password/reset') }}" method="POST">
                                    {!! csrf_field() !!}
                                    <input type="hidden" name="token" value="{{ $token }}">
                                    <div class="box-round">

                                        <div class="form-group">
                                            <div class="input-icon">
                                                <div class="icon"><i class="fa fa-envelope"></i></div>
                                                <input type="email" value="{{ old("email") }}" name="email" class="form-control" id="exampleInputEmail" placeholder="E-mail">
                                            </div>
                                        </div>
                                        <!-- End email form -->

                                        <div class="form-group">
                                            <div class="input-icon">
                                                <div class="icon"><i class="fa fa-envelope"></i></div>
                                                <input type="password" name="password" class="form-control" id="exampleInputPassword" placeholder="Password">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="input-icon">
                                                <div class="icon"><i class="fa fa-envelope"></i></div>
                                                <input type="password" name="password_confirmation" class="form-control" id="exampleInputPasswordConfirmation" placeholder="Password Confirmation">
                                            </div>
                                        </div>
                                        @include("errorList")

                                        <p>
                                            <button type="submit" class="btn btn-block btn-success">
                                                Change Password
                                            </button>
                                        </p>
                                    </div>
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