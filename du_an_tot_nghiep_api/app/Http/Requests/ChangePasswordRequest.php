<?php

namespace App\Http\Requests;

use App\Rules\PasswordRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ChangePasswordRequest extends FormRequest
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'current_password' => ['required'],
            'new_password' => ['required', 'string', 'confirmed','min:6']
        ];
    }

    public function messages()
    {
        return [
            'current_password.required' => 'CURRENT_PASSWORD_MUST_NOT_NULL',
            'new_password.required' => 'PASSWORD_MUST_NOT_NULL',
            'new_password.confirmed' => 'PASSWORD_CONFIRM_NOT_MATCH',
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
