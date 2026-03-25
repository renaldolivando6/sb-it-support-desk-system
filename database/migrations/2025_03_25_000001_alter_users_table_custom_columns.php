<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop default 'name' column from starter kit
            $table->dropColumn('name');

            // Add custom columns
            $table->string('username', 255)->nullable()->after('id');
            $table->string('first_name', 255)->nullable()->after('username');
            $table->string('last_name', 255)->nullable()->after('first_name');
            $table->string('division', 255)->nullable()->after('email');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('name')->after('id');
            $table->dropColumn(['username', 'first_name', 'last_name', 'division']);
        });
    }
};