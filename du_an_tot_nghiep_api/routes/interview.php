<?php

use App\Http\Controllers\api\InterviewController;
use App\Models\Interview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth.jwt'], function () {
    Route::post('interviews', [InterviewController::class, 'store'])->middleware( 'can:createInterview,App\Models\Interview');
    Route::resource('interviews', InterviewController::class)
        ->only(['update', 'index', 'destroy', 'show']);
});
