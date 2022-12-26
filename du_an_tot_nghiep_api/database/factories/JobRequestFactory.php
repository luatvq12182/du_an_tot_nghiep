<?php

namespace Database\Factories;

use App\Models\JobRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobRequestFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = JobRequest::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->name(),
            'description' => $this->faker->text(),
            'position' => $this->faker->text(),
            'amount' => $this->faker->numerify(),
            'location' => $this->faker->address(),
            'working_time' => '8h - 12h  13h30 - 17h30 Từ T2 - T6',
            'petitioner' => $this->faker->name(),
            'wage' => '3000 - 5000',
        ];
    }
}
