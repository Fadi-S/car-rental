<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ClientCreated extends Mailable
{
    use Queueable, SerializesModels;

    private $password, $client;

    public function __construct($client, $password)
    {
        $this->password = $password;
        $this->client = $client;
    }

    public function build()
    {
        return $this->view('user.emails.accountCreated')->with([
            "client" => $this->client,
            "password" => $this->password
        ]);
    }
}
