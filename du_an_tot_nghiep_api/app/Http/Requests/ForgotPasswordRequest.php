<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ForgotPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => 'required|email',
            'site_url' => 'required',
            'original_url' => 'required'
        ];
    }

    public function messages() {
        return [
            'email.required' => 'EMAIL_MUST_NOT_NULL',
            'email.email' => 'INVALID_EMAIL',
            'site_url.required' => 'SITE_URL_MUST_NOT_NULL',
            'original_url.required' => 'ORIGIN_URL_MUST_NOT_NULL'
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
