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
        Schema::table('visits', function (Blueprint $table) {
            $table->string('referer', 1000)->nullable()->after('path');
            $table->string('traffic_source', 50)->default('Direct')->after('referer');
            $table->string('device_type', 50)->default('Desktop')->after('traffic_source');
            $table->string('browser', 50)->nullable()->after('device_type');
            $table->string('session_id', 100)->nullable()->index()->after('browser');
            $table->integer('response_time_ms')->nullable()->after('session_id');
            $table->smallInteger('status_code')->default(200)->after('response_time_ms');
        });

        Schema::create('not_found_logs', function (Blueprint $table) {
            $table->id();
            $table->string('url', 1000);
            $table->string('referer', 1000)->nullable();
            $table->string('ip', 50)->nullable();
            $table->text('user_agent')->nullable();
            $table->unsignedInteger('hits')->default(1);
            $table->timestamp('last_occurred_at')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('not_found_logs');

        Schema::table('visits', function (Blueprint $table) {
            $table->dropColumn([
                'referer',
                'traffic_source',
                'device_type',
                'browser',
                'session_id',
                'response_time_ms',
                'status_code',
            ]);
        });
    }
};
