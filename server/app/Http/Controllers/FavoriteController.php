<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function index(){
        $user = Auth::user();
        $favorites = $user->favorites;
        $details = [];

        foreach($favorites as $favorite){
            $details[] = array_merge(['taitle' => $favorite -> taitle, 'image' => $favorite -> image, 'user' => $favorite -> user]);
        }

        return response()->json( $details);
    }

    public function toggleFavorite(Request $request){

        $validateData = $request->validate([
            "taitle" => 'required|string',
            "image" => 'required|string',
        ]);

        $existingFavorite = Favorite::where('user_id', Auth::id())
            ->where('taitle', $validateData['taitle'])
            ->where('image', $validateData['image'])
            ->first();
        
        
        //お気に入りが存在する場合の処理
        if($existingFavorite) {
            $existingFavorite->delete();
            return response()->json(["status" => "removed"]);

        //お気に入りが存在しない場合の処理
        } else {
            Favorite::create([
                'user_id' => Auth::id(),
                'taitle' => $validateData['taitle'],
                'image' => $validateData['image'],
                
            ]);
            
            return response()->json(["status" => "added"]);
        }
        
       
    }
    public function checkFavoriteStatus(Request $request){
        $validateData = $request->validate([
            "taitle" => 'required|string',
            "image" => 'required|string',
        ]);

        $isFavorite = Favorite::where('user_id', Auth::id())
        ->where('taitle', $validateData['taitle'])
        ->where('image', $validateData['image'])
        ->exists();

        return response()->json($isFavorite);
    }
}
