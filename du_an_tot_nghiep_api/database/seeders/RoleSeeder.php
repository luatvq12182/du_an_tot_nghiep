<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            [
                'name' => 'hr manager',
                'display_name' => 'trưởng phòng nhân sự',
                'type' => 'hr_manager',
            ],
            [
                'name' => 'other department heads',
                'display_name' => 'trưởng phòng ban khác',
                'type' => 'other_department_heads',
            ],
            [
                'name' => 'hr',
                'display_name' => 'nhân viên nhân sự',
                'type' => 'hr',
            ],
            [
                'name' => 'interviewer',
                'display_name' => 'người phỏng vấn',
                'type' => 'interviewer',
            ]
        ];

        foreach ($roles as $role){
            DB::table('roles')->insert($role);
        }

    }
}
