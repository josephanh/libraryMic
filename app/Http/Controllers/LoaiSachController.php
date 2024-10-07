<?php

namespace App\Http\Controllers;

use App\Models\loaiSach;
use Illuminate\Http\Request;

class LoaiSachController extends Controller
{
    /**
     * Display a listing of the resource.
     */
  public function index()
{
    $loaiSach = LoaiSach::all();
    return response()->json($loaiSach);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(loaiSach $loaiSach)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(loaiSach $loaiSach)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, loaiSach $loaiSach)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(loaiSach $loaiSach)
    {
        //
    }
}
