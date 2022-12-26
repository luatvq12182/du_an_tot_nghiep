<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;
    const STATUS_CV = 0;
    const STATUS_ROUND_ONE = 1;
    const STATUS_ROUND_TOW = 2;
    const STATUS_ROUND_PASS = 3;
    const STATUS_FAIL = 4;
    protected $table = "candidates";
    protected $fillable = [
        'name',
        'image',
        'email',
        'phone',
        'source',
        'experience',
        'school',
        'cv',
        'job_id',
        'status'
    ];
}
