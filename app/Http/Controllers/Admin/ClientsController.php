<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ClientRequest\CreateClientRequest;
use App\Http\Requests\ClientRequest\EditClientRequest;
use App\Models\Client\Client;
use App\Models\Status\Status;
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
        $clients = $this->clientRepo->getAll();
        return view("admin.clients.index", compact("clients"));
    }

    public function create()
    {
        return view("admin.clients.create");
    }

    public function store(CreateClientRequest $request)
    {
        $this->clientRepo->create($request);

        return redirect($this->adminUrl . "/clients/create");
    }

    public function show(Client $client)
    {
        $requests = $client->requests()->whereHas("car", function($query) {
            $query->where("status_id", Status::where("name", "Approved")->first()->id);
        })->paginate(100);
        $cars = $this->clientRepo->getAllCars($client);
        return view("admin.clients.show", compact("client", "cars", "requests"));
    }

    public function edit(Client $client)
    {
        return view("admin.clients.edit", compact("client"));
    }

    public function update(EditClientRequest $request, Client $client)
    {
        $this->clientRepo->update($request, $client);

        return redirect($this->adminUrl . "/clients/$client->username/edit");
    }

    public function destroy(Client $client)
    {
        $this->clientRepo->delete($client);

        return redirect($this->adminUrl . "/clients");
    }

}
