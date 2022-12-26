<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Mail\ResetPasswordMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class PasswordResetController extends Controller
{
    //

    public function sendPasswordResetEmail(ForgotPasswordRequest $request) {
        $status = true;
        $user = User::where('email', $request->email)->first();
        // If email does not exist
        if(empty($user)) {
            $status = false;
            return $this->getResponse($status, 'KHÔNG TÌM THẤY EMAIL', 404);
        } else {
            $send_status = $this->sendMail($request->email, $request->site_url, $request->original_url, $user);
            return $send_status ? $this->getResponse($status, 'GỬI MAIL THÀNH CÔNG')
                : $this->getResponse(false, 'GỬI MAIL THẬT BẠI', 500);
        }
    }

    private function sendMail(string $email, string $site_url, string $original_url, $user) {
        try {
            $token = $this->generateToken($email);
            if (empty($token)) {
                return false;
            }

            $data = [
                'url' => $site_url . '?token=' . $token,
                'forgot-pw-url' => $original_url,
                'user_name' => $user->name
            ];

            Mail::to($email)->queue(new ResetPasswordMail($data));
            return true;
        } catch (\Exception $ex) {
            Log::error($ex->getMessage());
            return false;
        }
    }

    private function generateToken(string $email){
        $token = Str::random(80);
        $save_result = $this->saveToken($token, $email);

        return $save_result ? $token : null;
    }

    private function saveToken(string $token, string $email)
    {
        try {
            DB::beginTransaction();

            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);

            DB::commit();
            return true;
        } catch (\Exception $ex) {
            DB::rollBack();
            Log::error($ex->getMessage());
            return false;
        }
    }

    public function resetPassword(ResetPasswordRequest $request) {
        $item_match_token = $this->updatePasswordRow($request->token)->get();
        if (count($item_match_token) == 0) {
            return $this->getResponse(false, 'KHÔNG TÌM THẤY TOKEN', 422);
        }

        $token_expired_at = Carbon::parse($item_match_token[0]->created_at)->addHour();
        if (Carbon::now() > $token_expired_at) {
            return $this->getResponse(false, 'RESET_PASSWORD_TOKEN ĐÃ HẾT HẠN', 401);
        }

        $email = $item_match_token[0]->email;

        $update_status = $this->resetPasswordStatus($email, $request->password);

        return $update_status ? $this->getResponse(true, 'ĐẶT LẠI MẬT KHẨU THÀNH CÔNG')
            : $this->getResponse(false, 'ĐẶT LẠI MẬT KHẨU THẤT BẠI', 500);
    }

    private function updatePasswordRow($token){
        return DB::table('password_resets')->where([
            'token' => $token
        ]);
    }

    public function resetPasswordStatus(string $email, string $password) {
        // find email
        $user = User::where('email', $email)->first();
        if (empty($user)) {
            return false;
        }

        try {
            DB::beginTransaction();
            // update password
            $data = [
                'password' => Hash::make($password),
            ];

            $user->update($data);

            // remove reset password record of user
            DB::table('password_resets')->where([
                'email' => $email
            ])->delete();

            DB::commit();
            return true;
        } catch (\Exception $ex) {
            DB::rollBack();
            Log::error($ex->getMessage());
            return false;
        }
    }

}
