<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    use HasFactory;
    protected $table = 'interviews';
    protected $fillable = [
        'job_id',
        'round_no',
        'position',
        'time_start',
        'time_end',
        'location',
        'title',
        'receiver',
        'name_candidate',
        'totalReceiver',
    ];
    
    public function name_candidate(){
        return $this->belongsTo(Candidate::class, 'name_candidate', 'id');
    }

    public function receiver(){
        return $this->belongsTo(User::class, 'receiver', 'id');
    }
}
