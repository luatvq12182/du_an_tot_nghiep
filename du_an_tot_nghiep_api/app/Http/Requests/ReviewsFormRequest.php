<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ReviewsFormRequest extends FormRequest
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
            'thinking' => [
                "required",
                "numeric",
                "min:0",
                "max:5"                     
            ],            
            'persistent_perseverance' => [
                "required",
                "numeric",
                "min:0",
                "max:5"
            ],            
            'career_goals' => [
                "required",
                "numeric",
                "min:0",
                "max:5"
            ],            
            'specialize_skill' => [
                "numeric",
                "min:0",
                "max:5" 
            ],            
            'english' => [
                "required",    
                "numeric",
                "min:0",
                "max:10"           
            ],            
            'adaptability' => [
                "required",
                "numeric",
                "min:0",
                "max:5"
            ],          
            'time_onbroad' => [
                "required", 
            ],            
            'reviews' => [
                "required",                
            ],            
            'result' => [
                "required",                
            ],            
        ];        
        return $formRules;
    }

    public function messages() {
        return [
            'thinking.required' => 'Không được để trống trường này',
            'persistent_perseverance.required' => 'Không được để trống trường này',
            'career_goals.required' => 'Không được để trống trường này',
            'specialize_skill.required' => 'Không được để trống trường này',
            'english.required' => 'Không được để trống trường này',
            'adaptability.required' => 'Không được để trống trường này',
            'time_onbroad.required' => 'Không được để trống trường này',
            'reviews.required' => 'Không được để trống trường này',
            'result.required' => 'Không được để trống trường này',
            'thinking.max' => 'Nhập tối đa là 10',
            'thinking.min' => 'Không nhập số âm',
            'persistent_perseverance.max' => 'Nhập tối đa là 10',
            'persistent_perseverance.min' => 'Không nhập số âm',
            'career_goals.max' => 'Nhập tối đa là 10',
            'career_goals.min' => 'Không nhập số âm',
            'specialize_skill.max' => 'Nhập tối đa là 10',
            'specialize_skill.min' => 'Không nhập số âm',
            'english.max' => 'Nhập tối đa là 10',
            'english.min' => 'Không nhập số âm',
            'adaptability.max' => 'Nhập tối đa là 10',
            'adaptability.min' => 'Không nhập số âm',
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
