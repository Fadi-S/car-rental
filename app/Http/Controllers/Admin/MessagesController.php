<?php

namespace App\Http\Controllers\Admin;

use App\Models\Contact\Contact;
use App\Http\Controllers\Controller;

class MessagesController extends Controller
{
    public function index()
    {
        $messages = Contact::paginate(100);
        return view("admin.messages", compact("messages"));
    }
}
