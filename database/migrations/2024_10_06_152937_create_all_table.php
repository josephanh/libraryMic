<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::create('loai', function (Blueprint $table) {
            $table->string('ma_loai')->primary(); // Mã loại
            $table->string('name'); // Tên loại
            $table->timestamps();
        });
        Schema::create('sach', function (Blueprint $table) {
            $table->string('ma_sach')->primary(); // Mã sách
            $table->string('name'); // Tên sách
            $table->string('tac_gia'); // Tác giả
            $table->text('mo_ta')->nullable(); // Mô tả
            $table->string('nha_xuat_ban'); // Nhà xuất bản
            $table->year('nam_xuat_ban'); // Năm xuất bản
            $table->integer('ton_kho'); // Tồn kho
            $table->string('hinh')->nullable(); // Hình ảnh
            $table->string('ma_loai'); // Mã loại
            $table->string('note'); // Note
            
            // Khóa ngoại
            $table->foreign('ma_loai')->references('ma_loai')->on('loai')->onDelete('cascade');

            $table->timestamps();
        });
        Schema::create('nguoi_muon', function (Blueprint $table) {
            $table->id(); // ID người mượn
            $table->string('ten'); // Tên người mượn
            $table->string('email')->unique(); // Email
            $table->string('password'); // Mật khẩu
            $table->timestamps();
        });
        Schema::create('hoa_don', function (Blueprint $table) {
            $table->id(); // ID hóa đơn
            $table->unsignedBigInteger('id_nguoi_muon'); // ID người mượn
            
            // Khóa ngoại
            $table->foreign('id_nguoi_muon')->references('id')->on('nguoi_muon')->onDelete('cascade');

            $table->timestamps();
        });
        Schema::create('chi_tiet_hoa_don', function (Blueprint $table) {
            $table->id(); // ID chi tiết hóa đơn
            $table->unsignedBigInteger('id_hoa_don'); // ID hóa đơn
            $table->string('ma_sach'); // Mã sách
            
            // Khóa ngoại
            $table->foreign('id_hoa_don')->references('id')->on('hoa_don')->onDelete('cascade');
            $table->foreign('ma_sach')->references('ma_sach')->on('sach')->onDelete('cascade');

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loai');
        Schema::dropIfExists('sach');
        Schema::dropIfExists('nguoi_muon');
        Schema::dropIfExists('hoa_don');
        Schema::dropIfExists('chi_tiet_hoa_don');
    }
};
