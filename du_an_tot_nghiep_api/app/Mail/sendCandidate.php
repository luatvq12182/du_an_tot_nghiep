<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class sendCandidate extends Mailable
{
    use Queueable, SerializesModels;

    public $item;
    public $title;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($item, $title)
    {
        $this->item = $item;
        $this->title = $title;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $title = $this->title;
        return $this->subject($title)->text('mailCandidate');
    }
}
