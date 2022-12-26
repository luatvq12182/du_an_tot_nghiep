<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
// use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserCreateRequest;
use App\Models\Role;
use App\Models\UserRole;

class UserController extends Controller
{
    public  function index(){
        return User::with('roles')->orderBy('updated_at', 'desc')->get();
    }

    public function show(User $user){
        if($user->status != User::USER_ACTIVE ) {
            abort(400, 'TÀI KHOẢN ĐÃ BỊ KHÓA');
        }

        return User::with('roles')->where('id', $user->id)->first();
    }

    public function store(UserCreateRequest $request){
        $password = Hash::make($request->password);
        $user = User::create(array_merge($request->all(), ['password' => $password]));

        $user->roles()->attach(!empty($request->roleIds) ? $request->roleIds : []);

        return response()->json([
            'status'=> 200,
            'message'=> 'User created successfully',
            'data'=>$user
        ]);
    }

    public function update(User $user, UpdateUserRequest $request){
        if($user->status != User::USER_ACTIVE ) {
            abort(400, 'TÀI KHOẢN ĐÃ BỊ KHÓA');
        }


        $user->update($request->all());
        if(!empty($request->roleIds)){
            $user->roles()->sync($request->roleIds);
        }

        return $user;
    }

    public function destroy(User $user){
        if($user->id == Auth::id()){
            abort(400, "KHÔNG THỂ XÓA TÀI KHOẢN");
        }

        $user->roles()->detach();
        $user->delete();
        return response()->json('delete_success');
    }

    public function disableUser(User $user, Request $request){
        $user->update(['status' => isset($request->status) ? $request->status : 1 ]);
        return $user;
    }

    public function  listRoleUserLogin(){
        return Auth::user()->roles()->select('roles.id','roles.name', 'roles.type')->get();
    }

    public function  updateProfile(Request $request){
        $user = User::find(Auth::id());
        $user->update(['name' => $request->name]);
        return  $user;

    }
}
