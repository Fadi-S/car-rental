@extends("admin.auth.layout")

@section("title")
    <title>
        Car Rental | Admin Login
    </title>
@endsection

@section("content")
    <div class="card-box">
        <div class="panel-heading">
            <h3 class="text-center"> Sign In to <strong class="text-custom">Car Rental</strong> </h3>
        </div>

        <div class="panel-body">
            {!! Form::open([ "method" => "POST", "url" => url($adminUrl . '/login') , "class"=>'form-horizontal m-t-20']) !!}

            {{ csrf_field() }}
            <div class="form-group{{ $errors->has('login') ? ' has-error has-feedback' : '' }}">
                <div class="col-xs-12">
                    <input class="form-control" value="{{ old('login') }}" name="login" type="text" required="" placeholder="Email">
                </div>
            </div>

            @if(!$errors->isEmpty())
                <div class="error">{{ $errors->first('login') }}</div>
            @endif

            <div class="form-group{{ $errors->has('login') ? ' has-error has-feedback' : '' }}">
                <div class="col-xs-12">
                    <input class="form-control" name="password" type="password" required="" placeholder="Password">
                </div>
            </div>

            <div class="form-group">
                <div class="col-xs-12">
                    <div class="checkbox checkbox-pink">
                        <input id="checkbox-signup" {{ (old('remember') ? "checked" : "") }} name="remember" type="checkbox">
                        <label for="checkbox-signup">
                            Remember Me
                        </label>
                    </div>
                </div>
            </div>

            <div class="form-group text-center m-t-40">
                <div class="col-xs-12">
                    <button class="btn btn-pink btn-block text-uppercase waves-effect waves-light" type="submit">Login</button>
                </div>
            </div>

            <div class="form-group m-t-30 m-b-0">
                <div class="col-sm-12">
                    <a href="{{ url($adminUrl.'/password/reset') }}" class="text-dark"><i class="fa fa-lock m-r-5"></i> Forgot Password</a>
                </div>
            </div>
            {!! Form::close() !!}

        </div>
    </div>
@endsection