<?php

use App\Http\Controllers\api\CandidateController;
use App\Http\Controllers\api\CandidateInterviewController;
use App\Http\Controllers\api\JobRequestController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/forgot-password', [\App\Http\Controllers\PasswordResetController::class, 'sendPasswordResetEmail']);
    Route::post('/reset-password', [\App\Http\Controllers\PasswordResetController::class, 'resetPassword']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);

});
