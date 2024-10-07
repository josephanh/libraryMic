<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sach;

class SachController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'ma_sach' => 'required|string|unique:sach,ma_sach',
            'name' => 'required|string',
            'tac_gia' => 'required|string',
            'mo_ta' => 'nullable|string',
            'nha_xuat_ban' => 'required|string',
            'nam_xuat_ban' => 'required|integer',
            'ton_kho' => 'required|integer',
            'hinh' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'ma_loai' => 'required|string',
        ]);

        $sach = new Sach();
        $sach->ma_sach = $request->ma_sach;
        $sach->name = $request->name;
        $sach->tac_gia = $request->tac_gia;
        $sach->mo_ta = $request->mo_ta;
        $sach->nha_xuat_ban = $request->nha_xuat_ban;
        $sach->nam_xuat_ban = $request->nam_xuat_ban;
        $sach->ton_kho = $request->ton_kho;
        $sach->ma_loai = $request->ma_loai;

        // Xử lý upload hình ảnh
        if ($request->hasFile('hinh')) {
            $file = $request->file('hinh');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            $sach->hinh = 'images/' . $filename;
        }

        $sach->save();

        return response()->json(['message' => 'Sách đã được thêm thành công!']);
    }
    public function import(Request $request)
{
    $request->validate([
        'file' => 'required|mimes:xlsx,xls',
    ]);

    Excel::import(new SachImport, $request->file('file'));

    return response()->json(['message' => 'Nhập sách thành công!']);
}
}