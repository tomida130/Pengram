<?php

namespace App\Http\Controllers;

use App\Models\Images;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //taitle 絵のタイトル image 絵
        $validateData = $request->validate([
            "taitle" => 'required|string',
            "image" => 'required|string',
        ]);
        
        $images= Images::create([
            "user_id" => Auth::id(),
            "taitle" => $validateData["taitle"],
            "image" => $validateData["image"],
        ]);

        $images->load('user');

        return response()->json($images);
    }

    /**
     * Display the specified resource.
     */
    public function show(Images $images)
    {
        $images = Images::with('user')->latest()->get();

        return response()->json($images);
    }
    
    public function mywork(Images $images)
    {
        $user_id = Auth::id();
        $images = Images::with('user')->where('user_id', $user_id)->latest()->get();

        return response()->json($images);
    }

    public function search($query)
    {
    
        // 型チェック
        if (!is_string($query)) {
            throw new \Exception('query is not string');
        }

    
        // 画像の取得
        // IN BOOLEAN MODEは検索ワードを含むか含まないかを0or1で判定
        $result = Images::whereRaw("MATCH(taitle) AGAINST(? IN NATURAL LANGUAGE MODE)", [$query])
        ->orWhere('taitle', 'LIKE', '%' . $query . '%') //含まれているリストから部分検索
        ->with('user')
        ->latest()
        ->get();
    
        return response()->json($result);
    }

    public function showId($id)
    {
        $image = Images::find($id);
    
        if (!$image) {
            return response()->json(['error' => 'Image not found'], 404);
        }

        $image->load('user');
    
        return response()->json($image);
    }
    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Images $images)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Images $images)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $image = Images::find($id);

        $image->delete();

        return response()->json(["message" => "正常にレビューを削除できました。"]);
    }
}
