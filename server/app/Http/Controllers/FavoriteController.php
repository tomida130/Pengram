<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Images;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function index(){
        $user = Auth::user();
        $favoritePartnerIds = $user->favorites->pluck('partner_id'); // partner_idのリストを取得
        $details = [];
        foreach ($favoritePartnerIds as $favorite) {
            $image = Images::with('user')->where('id', $favorite)->first();
            if ($image) {
                $details[] = $image;
            }
        }
        return response()->json($details);
    }

    public function toggleFavorite(Request $request){

        $validateData = $request->validate([
            "partner_id" => 'required|integer',
        ]);

        $existingFavorite = Favorite::where('user_id', Auth::id())
            ->where('partner_id', $validateData['partner_id'])
            ->first();
        
        
        //お気に入りが存在する場合の処理
        if($existingFavorite) {
            $existingFavorite->delete();
            return response()->json(["status" => "removed"]);

        //お気に入りが存在しない場合の処理
        } else {
            Favorite::create([
                'user_id' => Auth::id(),
                'partner_id'=>$validateData['partner_id'],
                
            ]);
            
            return response()->json(["status" => "added"]);
        }
        
       
    }
    public function checkFavoriteStatus(Request $request){
        $validateData = $request->validate([
            "partner_id" => 'required|integer',
        ]);

        $isFavorite = Favorite::where('user_id', Auth::id())
        ->where('partner_id', $validateData['partner_id'])
        ->exists();

        return response()->json($isFavorite);
    }
}
