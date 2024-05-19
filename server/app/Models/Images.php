<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Images extends Model
{
    use HasFactory;

    protected $fillable = [
        "taitle",
        "image",
        "user_id",
    ];

    public function user(){
        //絵は一人のユーザーに紐づいている
        return $this->belongsTo(User::class);
    }
}
