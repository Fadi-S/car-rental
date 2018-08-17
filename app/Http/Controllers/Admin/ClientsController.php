<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\ClientRequest;
use App\Models\Client\Client;
use App\Repositories\ClientRepository;
use App\Http\Controllers\Controller;

class ClientsController extends Controller
{
    private $clientRepo;
    private $adminUrl;

    public function __construct(ClientRepository $clientRepo)
    {
        $this->middleware("permission:add_client", ['only' => "create"]);
        $this->middleware("permission:edit_client", ['only' => "edit"]);
        $this->middleware("permission:view_client", ['only' => ["show", "index"] ]);

        $this->clientRepo = $clientRepo;
        $this->adminUrl = \Config::get("app.admin_url");
    }

    public function index()
    {
        $admins = $this->clientRepo->getAll();
        return view("admin.clients.index", compact("admins"));
    }

    public function create()
    {
        return view("admin.clients.create");
    }

    public function store(ClientRequest $request)
    {
        $this->clientRepo->create($request);

        return redirect($this->adminUrl . "/clients/create");
    }

    public function show(Client $client)
    {
        return view("admins.client.show", compact("client"));
    }

    public function edit(Client $client)
    {
        return view("admins.clients.edit", compact("client"));
    }

    public function update(ClientRequest $request, Client $client)
    {
        $this->clientRepo->update($request, $client);

        return redirect($this->adminUrl . "/clients/$client->id/edit");
    }

    public function destroy(Client $client)
    {
        $this->clientRepo->delete($client);

        return redirect($this->adminUrl . "/clients");
    }

}
