<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Images;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FavoriteController extends Controller
{
    public function index(){
        $user = Auth::user();
        $favoritePartnerIds = $user->favorites->pluck('partner_id'); // partner_idのリストを取得 partner_idはお気に入りid
        $details = [];//partner_idに対応しているimageリストを格納
        foreach ($favoritePartnerIds as $favorite) {
            $image = Images::with('user')->where('id', $favorite)->first();
            if ($image) {
                $details[] = $image;
            }
        }
        $details = array_reverse($details);
        return response()->json($details);
    }

    public function getTopFavoritedSortImages() {
         // 過去1週間の日時を取得
        $oneWeekAgo = Carbon::now()->subWeek();
        // Images テーブルと Favorite テーブルを結合して、過去1週間のいいねの数でソート
    $details = Images::select('images.*', DB::raw('COUNT(favorites.id) as favorite_count'))
    ->leftJoin('favorites', function ($join) use ($oneWeekAgo) {$join->on('images.id', '=', 'favorites.partner_id')
             ->where('favorites.created_at', '>=', $oneWeekAgo); // 過去1週間に絞る
             })
    ->groupBy('images.id') // 画像ごとにグループ化
    ->orderBy('favorite_count', 'desc') // いいねの数が多い順にソート
    ->get();


        $details = $details->load('user')->reverse();
        return response()->json($details);
    }

    public function toggleFavorite(Request $request){

        $validateData = $request->validate([
            "partner_id" => 'required|integer',
        ]);

        $favoriteCnt = Favorite::where('partner_id', $validateData['partner_id'])->count();
        $existingFavorite = Favorite::where('user_id', Auth::id())
            ->where('partner_id', $validateData['partner_id'])
            ->first();
        
        
        //お気に入りが存在する場合の処理
        if($existingFavorite) {
            $existingFavorite->delete();
            $favoriteCnt-=1;
            return response()->json(["status" => "removed",
                                     'cnt' => $favoriteCnt]);
            

        //お気に入りが存在しない場合の処理
        } else {
            Favorite::create([
                'user_id' => Auth::id(),
                'partner_id'=>$validateData['partner_id'],
                
            ]);
            $favoriteCnt+=1;
            return response()->json(["status" => "added",
                                    'cnt' => $favoriteCnt]);
        }
        
       
    }

    public function checkFavoriteStatus(Request $request){
        $validateData = $request->validate([
            "partner_id" => 'required|integer',
        ]);
        $favoriteCnt = Favorite::where('partner_id', $validateData['partner_id'])->count();

        $isFavorite = Favorite::where('user_id', Auth::id())
        ->where('partner_id', $validateData['partner_id'])
        ->exists();

        return response()->json(['favorite' =>$isFavorite,
                                'cnt' => $favoriteCnt]);
    }
}
