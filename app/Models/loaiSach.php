<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoaiSach extends Model
{
    use HasFactory;

    protected $table = 'loai';
    protected $primaryKey = 'ma_loai'; 
    public $timestamps = true; 
    protected $fillable = [
        'ma_loai', 
        'name',
        
    ];
 public function sachs()
    {
        return $this->hasMany(Sach::class, 'ma_loai'); // Thay đổi 'category_id' nếu cần
    }
}