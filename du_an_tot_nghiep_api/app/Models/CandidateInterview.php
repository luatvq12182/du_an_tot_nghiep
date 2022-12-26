<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidateInterview extends Model
{
    use HasFactory;
    protected $table = "candidate_interview";
    protected $fillable = [
        "candidate_id",	
        "interview_id",	
        "user_id",	
        "thinking",	
        "persistent_perseverance",	
        "career_goals",	
        "specialize_skill",	
        "english",	
        "adaptability",	
        "time_onbroad",	
        "reviews",	
        "result",
        "email",
    ];
}
