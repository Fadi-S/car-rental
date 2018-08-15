<?php

Route::prefix(Config::get("app.admin_url"))->group(function() {

    /* Login Routes */
    Route::get("login", 'Admin\Auth\LoginController@showLoginForm');
    Route::post("login", 'Admin\Auth\LoginController@login');

    /* Logout Routes */
    Route::post('logout', 'Admin\Auth\LoginController@logout');

    /* Password reset Routes */
    Route::get('password/reset', 'Admin\Auth\ForgotPasswordController@showLinkRequestForm');
    Route::post('password/email', 'Admin\Auth\ForgotPasswordController@sendResetLinkEmail');
    Route::get('password/reset/{token}', 'Admin\Auth\ResetPasswordController@showResetForm');
    Route::post('password/reset', 'Admin\Auth\ResetPasswordController@reset');


    Route::get("/", 'Admin\DashboardController@index');


    Route::resources([
        "cars" => 'Admin\CarsController',

        "admins" => 'Admin\AdminsController',

        "clients" => 'Admin\ClientsController',
    ]);

});

/* Login Routes */
Route::get("login", 'User\Auth\LoginController@showLoginForm');
Route::post("login", 'User\Auth\LoginController@login');

/* Register Routes */
Route::get("register", 'User\Auth\RegisterController@showRegisterForm');
Route::post("register", 'User\Auth\RegisterController@register');

/* Logout Routes */
Route::post('logout', 'User\Auth\LoginController@logout');

/* Password reset Routes */
Route::get('password/reset', 'User\Auth\ForgotPasswordController@showLinkRequestForm');
Route::post('password/email', 'User\Auth\ForgotPasswordController@sendResetLinkEmail');
Route::get('password/reset/{token}', 'User\Auth\ResetPasswordController@showResetForm');
Route::post('password/reset', 'User\Auth\ResetPasswordController@reset');


Route::get("/", 'DashboardController@index');

