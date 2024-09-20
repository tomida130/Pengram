<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('images', function (Blueprint $table) {
            // 既存のインデックスを削除
            $table->dropIndex(['taitle']);
            
            // taitleカラムに全文検索(fullText)インデックスを追加
            $table->fullText('taitle');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('images', function (Blueprint $table) {
            // fullTextインデックスを削除
            $table->dropFullText(['taitle']);
            
            // 再度通常のインデックスを追加
            $table->index('taitle');
        });
    }
};
