<?php

namespace App\Http\Controllers\User\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class ForgotPasswordController extends Controller
{
    use SendsPasswordResetEmails;

    public function __construct()
    {
        $this->middleware('guest');
    }

    public function showLinkRequestForm()
    {
        return view('user.auth.passwords.email');
    }

    protected function sendResetLinkResponse($response)
    {
        flash()->success("Email Sent!");
        return back()->with('status', trans($response));
    }
}
