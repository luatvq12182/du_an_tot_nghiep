<?php

namespace App\Policies;

use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function hrManager(User $user){        
        $roles = $user->roles;
        if( $roles->contains('type', Role::ROLE_HR_MANAGER)){
            return true;
        }

        return false;
    }
}
