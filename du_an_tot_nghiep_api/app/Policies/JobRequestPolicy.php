<?php

namespace App\Policies;

use App\Models\JobRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;

class JobRequestPolicy
{
    use HandlesAuthorization;

    public function create(User $user)
    {
        $roles = $user->roles()->pluck('type')->toArray();
        $status = array_uintersect($roles, [Role::ROLE_HR_MANAGER, Role::ROLE_OTHER_MANAGER ], "strcmp");
        if(!empty($status)){
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\JobRequest  $jobRequest
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, JobRequest $jobRequest)
    {
        if (in_array($jobRequest->status, [JobRequest::JOB_STATUS_REFUSE, JobRequest::JOB_STATUS_WAITING_FOR_APPROVAL])){
            $roles = $user->roles()->pluck('type')->toArray();
            if((in_array(Role::ROLE_HR_MANAGER, $roles) || in_array(Role::ROLE_OTHER_MANAGER, $roles)) && $user->id == $jobRequest->petitioner ){
                return true;
            } else {
                return false;
            }

        } else {
            $roles = $user->roles()->pluck('type')->toArray();
            if(in_array(Role::ROLE_HR_MANAGER, $roles)){
                return true;
            } else {
                return false;
            }
        }

    }

    public function delete(User $user, JobRequest $jobRequest)
    {
        if (in_array($jobRequest->status, [JobRequest::JOB_STATUS_REFUSE, JobRequest::JOB_STATUS_WAITING_FOR_APPROVAL])){
            $roles = $user->roles()->pluck('type')->toArray();
            if((in_array(Role::ROLE_HR_MANAGER, $roles) || in_array(Role::ROLE_OTHER_MANAGER, $roles)) && $user->id == $jobRequest->petitioner ){
                return true;
            } else {
                return false;
            }

        }
    }

    public function restore(User $user, JobRequest $jobRequest)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\JobRequest  $jobRequest
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function approve(User $user, JobRequest $jobRequest)
    {
        $roles = $user->roles()->pluck('type')->toArray();
        if(in_array(Role::ROLE_HR_MANAGER, $roles)) {
            return true;
        }

        return false;
    }
}
