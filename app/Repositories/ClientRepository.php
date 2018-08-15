<?php

namespace App\Repositories;

use App\Http\Requests\Admin\ClientRequest;
use App\Models\AdminLog\AdminLog;
use App\Models\Client\Client;

class ClientRepository
{

    public function create(ClientRequest $request)
    {
        $client = Client::create($request->all());
        if (!is_null($client)) {
            AdminLog::createRecord("add", $client);
            flash()->success("Client Created Successfully");
        } else {
            flash()->error("Error Creating Client!")->important();
        }
        return $client;
    }

    public function update(ClientRequest $request, Client $client)
    {
        if (!AdminLog::createRecord("edit", $client, $request->keys(), $request->all())) {
            flash()->error("You didn't change anything!");
            return false;
        }

        if ($client->update($request->except("password")))
            flash()->success("Client Updated Successfully");
        else
            flash()->error("Error Updating Client!")->important();

        return true;
    }

    public function getAll($paginate = 100)
    {
        return Client::paginate($paginate);
    }

    public function delete(Client $client)
    {
        if($client->delete()) {
            flash()->warning("Client Deleted Successfully");
            AdminLog::createRecord("delete", $client);
            return true;
        }else {
            flash()->error("Error Deleting Client");
            return false;
        }
    }

}