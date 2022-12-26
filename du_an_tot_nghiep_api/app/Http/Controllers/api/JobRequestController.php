<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\JobRequestFormRequest;
use App\Models\Candidate;
use App\Models\Interview;
use App\Models\JobRequest;
use Barryvdh\DomPDF\PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobRequestController extends Controller
{
    public function list()
    {
        $job = JobRequest::with('petitioner:id,name')->orderBy('updated_at', 'desc')->get();
        return response()->json($job);
    }

    public function show($id)
    {
        $job = JobRequest::with('petitioner:id,name')->find($id);
        return response()->json($job);
    }

    public function create(JobRequestFormRequest $request)
    {
        $job = JobRequest::all();
        foreach ($job as $j) {
            if ($j->title == $request->title && $j->position == $request->position) {
                return response()->json([
                    'status' => 440,
                    'message' => 'Yêu cầu đã tồn tại',
                ], 440);
            }
        }
        $data = array_merge($request->all(), ['status' => JobRequest::JOB_STATUS_WAITING_FOR_APPROVAL, 'petitioner' => Auth::id()]);
        return JobRequest::create($data);
    }

    public function update(JobRequestFormRequest $request, JobRequest $jobRequest)
    {
        // xử lý uodate tại đây
        if ($jobRequest->status == JobRequest::JOB_STATUS_REFUSE) {
            $data = array_merge($request->all(), ['status' => JobRequest::JOB_STATUS_WAITING_FOR_APPROVAL]);
            $jobRequest->update($data);
            return $jobRequest;
        }

        $model = JobRequest::find($jobRequest->id);
        $model->fill(array_merge($request->except('status'), ['status' => $jobRequest->status]));
        $model->save();
        return $model;
    }

    public function remove(JobRequest $jobRequest)
    {
        Candidate::where('job_id', $jobRequest->id)->delete();
        Interview::where('job_id', $jobRequest->id)->delete();
        $jobrequest = JobRequest::destroy($jobRequest->id);
        return $jobrequest;
    }

    public function approve(Request $request, JobRequest $jobRequest)
    {
        $jobrequest = $jobRequest->update(['status' => $request->status, 'reason' => $request->reason]);
        return response()->json('successful_status_change', 200);
    }

    public function pdf($id)
    {
        $job = JobRequest::find($id);
        if (!$job) {
            return response()->json('Không tồn tại yêu cầu', 440);
        }
        $pdf = app('dompdf.wrapper');
        $pdf->setOptions(array('encoding', 'utf8'));
        $pdf->setOptions(['isRemoteEnabled' => true])->loadView('pdf', compact('job'));

        return $pdf->download($job->title . '-' . $job->position . '.pdf');
    }
}
