<?php

Route::prefix(Config::get("app.admin_url"))->group(function() {
    /* Login Routes */
    Route::get("login", 'Admin\Auth\LoginController@showLoginForm');
    Route::post("login", 'Admin\Auth\LoginController@login');

    /* Password reset Routes */
    Route::get('password/reset', 'Admin\Auth\ForgotPasswordController@showLinkRequestForm');
    Route::post('password/email', 'Admin\Auth\ForgotPasswordController@sendResetLinkEmail');
    Route::get('password/reset/{token}', 'Admin\Auth\ResetPasswordController@showResetForm');
    Route::post('password/reset', 'Admin\Auth\ResetPasswordController@reset');
});

Route::prefix(Config::get("app.admin_url"))->middleware('auth:admin')->group(function() {
    /* Logout Routes */
    Route::post('logout', 'Admin\Auth\LoginController@logout');

    Route::get("/", 'Admin\DashboardController@index');

    Route::get("/admins/activity", 'Admin\AdminsController@showActivity')->middleware("can:activity_admin");
    Route::post('/admins/activity/{activity}/restore', 'Admin\AdminsController@restoreActivity');

    Route::resources([
        "cars" => 'Admin\CarsController',

        "admins" => 'Admin\AdminsController',

        "clients" => 'Admin\ClientsController',

        "roles" => 'Admin\RolesController',
    ]);

    Route::resource("locations", 'Admin\LocationsController')->except("show");
    Route::resource("categories", 'Admin\CarCategoriesController')->except("show");
    Route::resource("editions", 'Admin\CarEditionsController')->except("show");
    Route::resource("types", 'Admin\CarTypesController')->except("show");
    Route::resource("octanes", 'Admin\CarOctanesController')->except("show");
    Route::resource("sections", 'Admin\CarSectionsController')->except("show");

    Route::get("/messages", 'Admin\MessagesController@index');

    Route::get("change-password", 'Admin\AdminsController@showChangePasswordForm');
    Route::post("change-password", 'Admin\AdminsController@changePassword');

});

/* Login Routes */
Route::get("login", 'User\Auth\LoginController@showLoginForm');
Route::post("login", 'User\Auth\LoginController@login');

/* Register Routes */
Route::get("register", 'User\Auth\RegisterController@showRegistrationForm');
Route::post("register", 'User\Auth\RegisterController@register');

/* Logout Routes */
Route::post('logout', 'User\Auth\LoginController@logout');

/* Password reset Routes */
Route::get('password/reset', 'User\Auth\ForgotPasswordController@showLinkRequestForm');
Route::post('password/email', 'User\Auth\ForgotPasswordController@sendResetLinkEmail');
Route::get('password/reset/{token}', 'User\Auth\ResetPasswordController@showResetForm');
Route::post('password/reset', 'User\Auth\ResetPasswordController@reset');

Route::get("change-password", 'User\Auth\LoginController@showChangePasswordForm');
Route::post("change-password", 'User\Auth\LoginController@changePassword');

Route::get("/", 'User\DashboardController@index');
Route::get("/about", 'User\DashboardController@about');
Route::get("/contact", 'User\DashboardController@contact');
Route::post("/contact", 'User\DashboardController@saveContact');
Route::get("/terms", 'User\DashboardController@terms');

Route::prefix("/cars")->group(function() {
    Route::get("/", 'User\CarsController@index');

    Route::get("/sell", 'User\CarsController@showSellForm');
    Route::post("/sell", 'User\CarsController@storeSellCar');

    Route::get("/{car}", 'User\CarsController@show');
    Route::post("/{car}/request", 'User\CarsController@request');
});