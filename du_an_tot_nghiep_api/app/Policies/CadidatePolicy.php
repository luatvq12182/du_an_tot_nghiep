<?php

namespace App\Policies;

use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CadidatePolicy
{
    use HandlesAuthorization;

    public function hrOrManageHr(User $user){
        $roles = $user->roles()->pluck('type')->toArray();
        $status = array_uintersect($roles, [Role::ROLE_HR_MANAGER, Role::ROLE_HR ], "strcmp");
        if(!empty($status)){
            return true;
        }

        return false;
    }
}
