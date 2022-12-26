<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class JobRequestFormRequest extends FormRequest
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
        $formRules = [            
            'title' => [
                "required",     
                "min:5",              
            ],            
            'description' => [
                "required",
            ],            
            'position' => [
                "required",
                "min:5",                
                "max:150",
            ],            
            'amount' => [
                "numeric",
                "min:0"
            ],            
            'location' => [
                "required",               
            ],            
            'working_time' => [
                "required",
            ],          
            'wage' => [
                "required", 
            ],            
            'deadline' => [
                "required",
            ],            
            'request' => [
                "required",
            ],            
        ];        
        return $formRules;
    }

    public function messages() {
        return [
            'title.required' => 'Không được để trống trường này',
            'title.unique' => 'Yêu cầu đã tồn tại',
            'description.required' => 'Không được để trống trường này',
            'position.required' => 'Không được để trống trường này',
            'amount.required' => 'Không được để trống trường này',
            'location.required' => 'Không được để trống trường này',
            'working_time.required' => 'Không được để trống trường này',
            'wage.required' => 'Không được để trống trường này',
            'deadline.required' => 'Không được để trống trường này',
            'title.min' => 'Nhập ít nhất 5 kí tự',
            'position.min' => 'Nhập ít nhất 5 kí tự',
            'amount.min' => 'Số lượng không được âm',
            'position.max' => 'Nhập tối đa 150 kí tự',
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
