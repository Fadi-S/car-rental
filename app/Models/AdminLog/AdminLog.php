<?php

namespace App\Models\AdminLog;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class AdminLog extends Model
{
    use AdminLogMethods, AdminLogRelationships, AdminLogAttributes;

    protected $table = "admins_log";
    protected $guarded = [];
    public $timestamps = false;
    protected $dates = ['done_at'];
    protected $with = ['admin', 'logable'];

    public function __construct(array $attributes = [])
    {
        $this->done_at = Carbon::now();
        $this->admin_id = auth()->guard('admin')->id();

        parent::__construct($attributes);
    }
}
