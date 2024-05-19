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
        $images = Images::with('user')
        ->get();

        return response()->json($images);
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
    public function destroy(Images $images)
    {
        //
    }
}
