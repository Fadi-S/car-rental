<?php

namespace App\Http\Middleware;

use Closure;

class VerifyPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param   String $permission
     * @return mixed
     */
    public function handle($request, Closure $next, $permission)
    {
        if(auth()->guard('admin')->check()) {
            $user = $request->user('admin');
            if ($user->hasPermission($permission)) {
                return $next($request);
            }
        }
        abort(404);
        return null;
    }
}
