<?php

namespace App\Http\Controllers;

use App\Models\Interview;
use Illuminate\Http\Request;

class InterviewController extends Controller
{
    public function index()
    {
         $interview = Interview::all();
         return $interview;
    }

    public function store(Request $request)
    {
        $interview = Interview::create($request->all());
        return $interview;
    }

    public function show(Interview $interview)
    {   
        return $interview;
    }

    public function update(Request $request,Interview $interview)
    {
        return $interview->update($request->all());

    }

    public function destroy(Interview $interview)
    {
        return $interview->delete();
    }
}
