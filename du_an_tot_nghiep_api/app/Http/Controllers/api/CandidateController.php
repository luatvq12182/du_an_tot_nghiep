<?php

namespace App\Http\Controllers\api;

use Maatwebsite\Excel\Facades\Excel;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing as WorksheetDrawing;
use PhpOffice\PhpSpreadsheet\Worksheet\MemoryDrawing;
use App\Http\Controllers\Controller;
use App\Http\Requests\CandidateFormRequest;
use App\Imports\CandidateImport;
use App\Models\Candidate;
use App\Models\CandidateInterview;
use App\Models\Interview;
use App\Models\JobRequest;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    public function list()
    {
        $candidate = Candidate::orderBy('updated_at', 'desc')->get();
        return response()->json($candidate);
    }

    public function create(CandidateFormRequest $request)
    {
        $model = new Candidate();
        $model->fill($request->all());
        if ($request->hasFile('image')) {
            $newFileName = uniqid() . '-' .$request->file('image')->getClientOriginalName();
            $path = $request->file('image')->storeAs('public/images/candidate', $newFileName);
            $model->image = $newFileName;
        } else {
            $model->image = 'no-avatar.png';
        }
        if ($request->hasFile('cv')) {
            $newFileName = uniqid() . '-' . $request->cv->getClientOriginalName();
            $path = $request->cv->storeAs('public/cv', $newFileName);
            $model->cv = "http://127.0.0.1:8000/storage/cv/" . $newFileName;
        }
        $model->save();
        return response()->json([
            'status' => 200,
            'message' => 'created successfully',
            'data' => $model
        ]);
    }

    public function edit(Request $request, $id)
    {
        $job = JobRequest::all();
        $model = Candidate::find($id);
        $model->fill($request->all());
        if ($request->hasFile('image')) {
            $newFileName = uniqid() . '-' . $request->image->getClientOriginalName();
            $path = $request->image->storeAs('public/images/candidate', $newFileName);
            $model->image = $newFileName;
        }
        if ($request->hasFile('cv')) {
            $newFileName = uniqid() . '-' . $request->cv->getClientOriginalName();
            $path = $request->cv->storeAs('public/cv', $newFileName);
            $model->cv = "http://127.0.0.1:8000/storage/cv/" . $newFileName;
        }
        $model->save();
        return $model;
    }

    public function remove($id)
    {
        $interview = Interview::where('name_candidate', 'like', $id)->get();
        foreach ($interview as $i) {
            CandidateInterview::where('interview_id', 'like', $i->id)->delete();
        }
        Interview::where('name_candidate', 'like', $id)->delete();
        Candidate::where('job_id', 'like', $id)->delete();
        $candidate = Candidate::destroy($id);
        return $candidate;
    }

    public function import(Request $request)
    {
        $errors = array();
        $import = new CandidateImport;
        $import->import(request()->file('import'));
        foreach ($import->failures() as $key => $failure) {
            $errors[$key]['row'] = $failure->row();
            $errors[$key]['error'] = $failure->errors();
        }
        if ($import->failures()->isNotEmpty()) {
            return $errors;
        }
        return response()->json([
            'status' => 200,
            'message' => 'created successfully',
        ]);
    }
}
