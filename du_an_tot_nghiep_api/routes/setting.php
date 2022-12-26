<?php

use App\Http\Controllers\SettingController;
use App\Models\Interview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::resource('settings', SettingController::class)
    ->only(['update', 'index', 'destroy', 'store']);
