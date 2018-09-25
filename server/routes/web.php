<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

require_once('../cleanRecord.php');
require_once('../constants.php');

require_once('AccountRoutes.php');
require_once('NodeRoutes.php');

$router->get('/', function () use ($router) {
    return $router->app->version();
});
