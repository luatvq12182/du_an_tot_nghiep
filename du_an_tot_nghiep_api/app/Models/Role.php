<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    
    const ROLE_HR_MANAGER = 'hr_manager';
    const ROLE_OTHER_MANAGER = 'Manager';
    const ROLE_HR = 'hr';
    const ROLE_INTERVIEWER = 'interviewer';


    protected $fillable = [
        'name',
        'display_name',
        'type'
    ];

    public function user()
    {
        return $this->belongsToMany(User::class, 'user_roles', 'role_id', 'user_id');
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permissions', 'role_id', 'permission_id');
    }
}
