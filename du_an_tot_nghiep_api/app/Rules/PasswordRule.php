<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class PasswordRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        // Banned words
        $words = array('¥', '\\', '&', '<', '>', '"', '\'', ' ');
        foreach ($words as $word) {
            if (stripos($value, $word) !== false) return false;
        }

        $count_pass = 0;

        if (preg_match('/[a-z]/', $value)) {
            $count_pass++;
        }

        if (preg_match('/[A-Z]/', $value)) {
            $count_pass++;
        }

        if (preg_match('/[0-9]/', $value)) {
            $count_pass++;
        }

        if (preg_match('/[!#$%&()*+,-.:;<=>?@[\]^_`{|}~\/]/', $value)) {
            $count_pass++;
        }

        $pw_length = strlen($value);
        if ($count_pass >= 2 && $pw_length >= 8 && $pw_length <= 200) {
            return true;
        }

        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'INVALID_PASSWORD';
    }
}
