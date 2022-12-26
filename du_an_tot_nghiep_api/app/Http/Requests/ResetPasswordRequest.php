<?php

namespace App\Http\Requests;

use App\Rules\PasswordRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ResetPasswordRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'token' => ['required'],
            'password' => ['required', 'string', 'confirmed', 'min:6']
        ];
    }

    public function messages() {
        return [
            'token.required' => 'TOKEN_MUST_NOT_NULL',
            'password.required' => 'PASSWORD_MUST_NOT_NULL',
            'password.confirmed' => 'PASSWORD_CONFIRM_NOT_MATCH',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => [$validator->errors()],
            'items' => null], 440));
    }
}
