<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth as FacadesJWTAuth;
use Tymon\JWTAuth\JWTAuth;
use Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct() {
        $this->middleware('auth.jwt', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }


        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'SAI TÀI KHOẢN HOẶC MẬT KHẨU!'], 401);
        }

        if(Auth::user()->status != 1){
            return response()->json(['error' => 'TÀI KHOẢN ĐÃ BỊ KHÓA'], 400);
        }

        return $this->createNewToken($token);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }

    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    public function userProfile()
    {
        return response()->json(auth()->user());
    }

    protected function createNewToken($token){
        $user = User::with('roles')->where('id', auth()->user()->id)->first();
        foreach($user->roles as $role){
            $user->roles = $role->id;
        }

        $u['id'] = $user->id;
        $u['name'] = $user->name;
        $u['email'] = $user->email;
        $u['employee_code'] = $user->employee_code;
        $u['password'] = $user->password;
        $u['status'] = $user->status;
        $u['role'] = $user->roles;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => $u,
        ]);
    }

    public function changePassword(ChangePasswordRequest $request){
        if (!(Hash::check($request->get('current_password'), Auth::user()->password))) {
            // The passwords matches
            return $this->getResponse(false, "MẬT KHẨU HIỆN TẠI KHÔNG PHÙ HỢP", 422);
        }

        if(strcmp($request->get('current_password'), $request->get('new_password')) == 0){
            //Current password and new password are same
            return $this->getResponse(false, "MẬT KHẨU HIỆN TẠI VÀ MẬT KHẨU MỚI GIỐNG NHAU", 422);
        }
        //Change Password
        $data['password'] = Hash::make($request->get('new_password'));
        $data['password_changed_at'] = Carbon::now();
        $update_status = User::where('id', Auth::id())->update($data);

        return $update_status ? $this->getResponse(true, 'THAY ĐỔI MẬT KHẨU THÀNH CÔNG')
            : $this->getResponse(false, 'THAY ĐỔI MẬT KHẨU THẤT BẠI', 500);
    }
}
