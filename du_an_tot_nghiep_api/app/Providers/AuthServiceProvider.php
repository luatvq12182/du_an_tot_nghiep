<?php

namespace App\Providers;

use App\Models\Candidate;
use App\Models\CandidateInterview;
use App\Models\Interview;
use App\Models\JobRequest;
use App\Models\User;
use App\Policies\CadidatePolicy;
use App\Policies\CandidateInterviewPolicy;
use App\Policies\InterviewPolicy;
use App\Policies\JobRequestPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        User::class => UserPolicy::class,
        JobRequest::class => JobRequestPolicy::class,
        Candidate::class => CadidatePolicy::class,
        Interview::class => InterviewPolicy::class,
        CandidateInterview::class => CandidateInterviewPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        //
    }
}
