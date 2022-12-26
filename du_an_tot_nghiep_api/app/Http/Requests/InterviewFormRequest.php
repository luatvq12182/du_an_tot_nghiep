<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class InterviewFormRequest extends FormRequest
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
            'round_no' => [
                "required",                     
            ],            
            'time_start' => [
                "required",
                "after:yesterday"
            ],            
            'time_end' => [
                "required",
                "after:yesterday"
            ],            
            'title' => [
                "required",  
            ],            
            'location' => [
                "required",               
            ],         
            'name_candidate' => [
                "required",                
            ],            
        ];        
        return $formRules;
    }

    public function messages() {
        return [
            'round_no.required' => 'Không được để trống trường này',            
            'time_start.required' => 'Không được để trống trường này',            
            'time_end.required' => 'Không được để trống trường này',            
            'title.required' => 'Không được để trống trường này',            
            'location.required' => 'Không được để trống trường này',            
            'name_candidate.required' => 'Không được để trống trường này',            
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
