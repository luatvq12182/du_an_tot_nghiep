<?php

use App\Http\Controllers\api\CandidateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth.jwt',  'can:hrOrManageHr, App\Models\Candidate'])->group(function(){
    Route::post('/candidate/create', [CandidateController::class, 'create'])->name('candidate.create');
    Route::post('/candidate/edit/{id}', [CandidateController::class, 'edit'])->name('candidate.edit');
    Route::delete('/candidate/delete/{id}', [CandidateController::class, 'remove'])->name('candidate.delete');

    Route::post('/import', [CandidateController::class, 'import']);
});
Route::get('/candidate', [CandidateController::class, 'list'])->name('candidate')->middleware('auth.jwt');

