<?php

namespace App\Console\Commands;

use App\Mail\sendMailReview;
use App\Models\Candidate;
use App\Models\CandidateInterview;
use App\Models\Interview;
use App\Models\JobRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class sendMailCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'review:sendmail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send email to end the interview';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $interviews = Interview::where("time_end", '=', "'" . Carbon::now('Asia/Ho_Chi_Minh') . "'")->get();
        foreach ($interviews as $interview) {
            $job = JobRequest::find($interview->job_id);
            $candidate = Candidate::find($interview->name_candidate);
            $toUser = explode(',', $interview->receiver);
            foreach ($toUser as $key => $value) {
                $u = User::find($value);
                $senditem = new \stdClass();
                $senditem->receiver = $u->name;
                $senditem->name = $candidate->name;
                $senditem->position = $job->position;
                $senditem->job = $job->title;
                Mail::to($u->email)->send(new sendMailReview($senditem, '[SSKPI] Thư mời đánh giá'));
            }
        }
    }
}
