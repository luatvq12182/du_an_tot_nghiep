<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class CandidateFormRequest extends FormRequest
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
            'name' => 'required|min:4',            
            'image' => [
                "mimes:jpg,png"
            ],            
            'email' => [
                "required",
                "email",
                Rule::unique('candidates', 'email') 
            ],            
            'phone' => [
                "required",                 
            ],            
            'source' => [
                "required",               
            ],            
            'experience' => [
                "required",
                "numeric",
                "min:0"
            ],            
            'school' => [
                "required",
            ],            
            'cv' => [
                "mimes:pdf,doc,docx"
            ],            
            'status' => [
                "required",
            ],            
        ];
        if($this->id == null){
            $formRules['cv'][] = "required";
        }   
        return $formRules;  
    }

    public function messages() {
        return [
            'name.required' => 'Không được để trống trường này',
            'image.mimes' => 'Ảnh chỉ nhận định dạng jpg/png',
            'cv.mimes' => 'Cv chỉ nhận định dạng pdf/doc/docx',
            'email.required' => 'Không được để trống trường này',
            'email.email' => 'Không đúng định dạng email',
            'email.unique' => 'Ứng viên đã tồn tại',
            'name.min' => 'Nhập ít nhất 4 kí tự',
            'phone.required' => 'Không được để trống trường này',
            'source.required' => 'Không được để trống trường này',
            'experience.required' => 'Không được để trống trường này',
            'school.required' => 'Không được để trống trường này',
            'cv.required' => 'Không được để trống trường này',
            'status.required' => 'Không được để trống trường này',
            'experience.min' => 'Không nhập số âm',
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
