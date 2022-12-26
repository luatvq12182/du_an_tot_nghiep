<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCandidateInterviewTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('candidate_interview', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('candidate_id');
            $table->unsignedBigInteger('interview_id');
            $table->unsignedBigInteger('user_id');
            $table->integer('thinking');
            $table->integer('persistent_perseverance');
            $table->integer('career_goals');
            $table->integer('specialize_skill');
            $table->integer('english');
            $table->integer('adaptability');
            $table->string('time_onbroad');
            $table->string('reviews');
            $table->string('result');
            $table->timestamps();
            $table->foreign('candidate_id')->references('id')->on('candidates');
            $table->foreign('interview_id')->references('id')->on('interviews');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('candidate_interview');
    }
}
