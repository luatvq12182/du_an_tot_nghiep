<?php

namespace Database\Factories;

use App\Models\Candidate;
use App\Models\JobRequest;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;

class CandidateFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Candidate::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {    
        return [
            'name' => $this->faker->name(),
            'image' => $this->faker->image('public/storage/images/candidate', 640, 480, null, false),
            'phone' => '0971403754',
            'source' => $this->faker->sentence(),
            'experience' => $this->faker->numberBetween(0,10),
            'school' => $this->faker->sentence(),
            'cv' => basename(UploadedFile::fake()->create('cv.pdf')->store('public/cv')),
            'job_id' => JobRequest::all()->random()->id,
            'status' => $this->faker->sentence()
        ];
    }
}
