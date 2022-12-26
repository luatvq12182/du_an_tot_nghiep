<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserCreateRequest extends FormRequest
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
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
            'employee_code' => 'required|unique:users',
            'status' => 'numeric',
            'roleIds'    => "required|array",
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
