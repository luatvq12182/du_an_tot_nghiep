<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobRequest extends Model
{
    const JOB_STATUS_REFUSE = 0;
    const JOB_STATUS_WAITING_FOR_APPROVAL= 1;
    const JOB_STATUS_APPROVED = 2;

    use HasFactory;
    protected $table = 'job_requests';
    protected $fillable = [
        'title',
        'description',
        'position',
        'amount',
        'location',
        'working_time',
        'petitioner',
        'wage',
        'status',
        'deadline',
        'reason',
        'request',
    ];

    public function petitioner(){
        return $this->belongsTo(User::class, 'petitioner', 'id');
    }
}
