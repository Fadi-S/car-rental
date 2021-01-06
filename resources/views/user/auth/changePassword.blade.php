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
                                <form action="{{ url('/change-password') }}" method="POST">
                                    {!! csrf_field() !!}
                                    <div class="box-round">
                                        <div class="form-group">
                                            <div class="input-icon">
                                                <div class="icon"><i class="fa fa-lock"></i></div>
                                                <input type="password" name="old_password" class="form-control" placeholder="Old Password">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="input-icon">
                                                <div class="icon"><i class="fa fa-lock"></i></div>
                                                <input type="password" name="new_password" class="form-control" placeholder="New Password">
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <div class="input-icon">
                                                <div class="icon"><i class="fa fa-lock"></i></div>
                                                <input type="password" class="form-control" name="new_password_confirmation" placeholder="New Password Confirmation">
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