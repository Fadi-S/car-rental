@extends("admin.auth.layout")

@section("title")
    <title>
        Reset password | Admin
    </title>
@endsection

@section("content")
    <div class=" card-box">
        <div class="panel-heading">
            <h3 class="text-center"> Reset password </h3>
        </div>

        <div class="panel-body">
            <form role="form" method="POST" class="text-center" action="{{ url($adminUrl.'/password/email') }}">
                {{ csrf_field() }}
                @if (session('status'))
                    <div class="alert alert-success">
                        {{ session('status') }}
                    </div>
                @else
                    <div class="alert alert-info">
                        Enter your Email and instructions will be sent to you!
                    </div>
                @endif

                <div class="form-group m-b-0{{ $errors->has('email') ? ' has-error has-feedback' : '' }}">
                    <div class="input-group">
                        <input type="email" name="email" class="form-control" required placeholder="Email" >
                        <span class="input-group-btn">
                            <button type="submit" class="btn btn-pink w-sm waves-effect waves-light">
                                Reset
                            </button>
                        </span>
                    </div>
                </div>
                <br>
                @if ($errors->has('email'))
                    <span class="alert alert-danger">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                @endif

            </form>
        </div>
    </div>

@endsection
