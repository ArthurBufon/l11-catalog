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
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();

            // Reference to the product
            $table->foreignId('product_id')->constrained()->onDelete('cascade');

            // Stock level details
            $table->integer('stock_level')->default(0);
            $table->integer('reserved_stock')->default(0);
            $table->integer('available_stock')->virtualAs('stock_level - reserved_stock');

            // Optional columns for additional inventory details
            $table->date('last_restocked_at')->nullable();
            $table->string('location')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventories');
    }
};
