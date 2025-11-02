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
        Schema::create('weapons', function (Blueprint $table) {
            $table->id();
            $table->string('weapon_name');                // 武器名
            $table->text('description')->nullable(); // 説明
            $table->integer('price')->default(0);  // 価格
            $table->decimal('weight', 5, 2)->nullable(); // 重さ(kg)
            $table->string('image_url')->nullable(); // 画像パス
            $table->timestamps(); // created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weapons');
    }
};
