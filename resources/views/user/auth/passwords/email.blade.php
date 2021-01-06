@extends("user.master")

@section("content")
    <div class="col-lg-12 signin">
        <div class="row">
            <div class="container">
                <div class="col-lg-12">
                    <div class="col-lg-4 sign float-none">
                        <div class="text-center"><h1>Reset Password</h1></div>
                        <div class="signform">
                            <div class="fields">
                                <form action="{{ url('/password/email') }}" method="POST">
                                    {!! csrf_field() !!}
                                    <div class="box-round">

                                        <div class="form-group">
                                            <div class="input-icon">
                                                <div class="icon"><i class="fa fa-envelope"></i></div>
                                                <input type="email" name="email" class="form-control" id="exampleInputEmail" placeholder="E-mail">
                                            </div>
                                        </div>
                                        <!-- End email form -->
                                        @include("errorList")

                                        <p>
                                            <button type="submit" class="btn btn-block btn-success">
                                                Submit
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