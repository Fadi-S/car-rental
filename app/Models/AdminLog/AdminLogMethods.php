<?php

namespace App\Models\AdminLog;

use Illuminate\Database\Eloquent\Model;

trait AdminLogMethods {

    public function action()
    {
        return $this->message['action'];
    }

    public function logged()
    {
        $Logged = $this->logable_type;
        return $Logged::withTrashed()->find($this->logable_id);
    }
    public function old()
    {
        return $this->message['old'];
    }

    public function new()
    {
        return $this->message['new'];
    }

    public static function createRecord($action, Model $logable, $keys=null, $values=null, $relations=[])
    {
        if($action == 'edit') {
            $old = [];
            $new = [];
            foreach($keys as $key) {
                if(in_array($key, array_merge($logable->getFillable(), $relations) )) {
                    if(in_array($key, $relations)) {
                        if($logable->$key->pluck(key($relations))->toArray() != $values[$key]) {
                            $old[$key] = $logable->$key->pluck(key($relations))->toArray();
                            $new[$key] = $values[$key];
                        }
                    }else{
                        if($logable->getAttributes()[$key] != $values[$key]) {
                            $old[$key] = $logable->getAttributes()[$key];
                            $new[$key] = $values[$key];
                        }
                    }
                }
            }
            if(empty($old))
                return false;

            $logable->adminLog()->create(
                [
                    'message' => [
                        'action' => $action,
                        'old' => $old,
                        'new' => $new,
                    ]
                ]);
        }else
            $logable->adminLog()->create(['message' => ['action' => $action]]);

        return true;
    }
}