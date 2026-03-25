<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('administrator_user_sb', function (Blueprint $table) {
            $table->increments('id');
            $table->string('company', 10);
            $table->string('nama', 100);
            $table->string('lokasi', 50)->nullable();
            $table->string('posisi', 50)->nullable();
            $table->string('rdweb', 100)->nullable();
            $table->string('website_rosebrand', 100)->nullable();
            $table->string('sfa', 50)->nullable();
            $table->string('mobile_sales', 50)->nullable();
            $table->string('application_login', 50)->nullable();
            $table->integer('group_id')->nullable();
            $table->string('group_name', 50)->nullable();
            $table->string('id_entry', 50);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();
            $table->boolean('is_resigned')->default(false);
            $table->timestamp('resigned_at')->nullable();
            $table->string('id_delete', 50)->nullable();
            $table->string('resign_status', 10)->nullable()->default('Pending');
            $table->string('delete_status', 10)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('administrator_user_sb');
    }
};