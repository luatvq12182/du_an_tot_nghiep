<?php

namespace App\Imports;

use App\Models\Candidate;
use App\Models\JobRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class CandidateImport implements ToModel, WithStartRow, WithValidation, SkipsOnFailure
{
    use Importable, SkipsErrors, SkipsFailures;

    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        Candidate::create([
            'name' => $row[0],
            'image' => "no-avatar.png",
            'email' => $row[1],
            'phone' => $row[2],
            'source' => $row[3],
            'experience' => $row[4],
            'school' => $row[5],
            'cv' => $row[6],
            'job_id' => $row[7],
            'status' => $row[8],
        ]);
    }

    public function startRow(): int
    {
        return 2;
    }

    public function rules(): array
    {
        return [
            '*.0'                      => ['required', 'min:4'],
            '*.1'                     => ['required', 'email', Rule::unique('candidates', 'email')],
            '*.2'                  => ['required'],
            '*.3'                  => ['required'],
            '*.4'            => ['required', 'min:0', 'numeric'],
            '*.5'                  => ['required'],
            '*.6'                  => ['required'],
            '*.7'                      => ['required'],
            '*.8'                      => ['required'],
        ];
    }

    public function customValidationMessages()
    {
        return [
            '0.required' => 'Trường Họ tên trống',
            '0.min' => 'Trường Họ tên ít hơn 4 kí tự',
            '4.required' => 'Trường kinh nghiệm trống',
            '4.min' => 'Trường kinh nghiệm ít hơn 4 kí tự',
            '1.required' => 'Trường email trống',
            '1.unique' => 'Email đã tồn tại',
            '1.email' => 'Trường email không đúng định dạng',
            '2.required' => 'Trường Số điện thoại trống',
            '3.required' => 'Trường Nguồn trống',
            '6.required' => 'Trường cv trống',
            '5.required' => 'Trường học trống',
            '7.required' => 'Trường Dự án trống',
            '8.required' => 'Trường Trạng thái trống',
        ];
    }

    public function customValidationAttributes()
    {
        return [
            '0' => 'Họ tên',
            '1' => 'email',
            '2' => 'Số didenj thoại',
            '3' => 'Nguồn',
            '4' => 'Kinh nghiệm',
            '5' => 'Trường học',
            '6' => 'cv',
            '7' => 'Dự án',
            '8' => 'Trạng thái',
        ];
    }
}
