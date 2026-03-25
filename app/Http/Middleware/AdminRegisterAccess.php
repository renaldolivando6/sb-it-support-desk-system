<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminRegisterAccess
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->session()->get('register_access')) {
            return redirect()->route('login');
        }

        return $next($request);
    }
}