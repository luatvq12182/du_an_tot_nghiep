<?php

namespace App\Policies;

use App\Models\JobRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;

class CandidateInterviewPolicy
{
    use HandlesAuthorization;

    public function createOrUpdate(User $user){
        $roles = $user->roles()->pluck('type')->toArray();
        $status = array_uintersect($roles, [Role::ROLE_HR_MANAGER, Role::ROLE_OTHER_MANAGER, Role::ROLE_INTERVIEWER ], "strcmp");
        if(!empty($status)){
            return true;
        }

        return false;
    }

}
