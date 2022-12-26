<?php

namespace App\Policies;

use App\Models\JobRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;

class InterviewPolicy
{
    use HandlesAuthorization;

    public function createInterview(User $user){
        $roles = $user->roles()->pluck('type')->toArray();
        $status = array_uintersect($roles, [Role::ROLE_HR_MANAGER, Role::ROLE_HR ], "strcmp");
        if(!empty($status)){
            return true;
        }

        return false;
    }

}
