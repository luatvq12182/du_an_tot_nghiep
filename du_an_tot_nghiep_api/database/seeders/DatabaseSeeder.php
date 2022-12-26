<?php

namespace Database\Seeders;

use App\Models\Candidate;
use App\Models\JobRequest;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        // JobRequest::factory(15)->create();
        Candidate::factory(300)->create();
        RoleSeeder::class;
    }
}
