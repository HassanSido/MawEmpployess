<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salary_recepits', function (Blueprint $table) {
            $table->id();
            $table->string('EmployeeName');
            $table->string('Days');
            $table->string('Salary');
            $table->integer('Stauts');
            $table->string('Notes');
            $table->string('Employee_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('salary_recepits');
    }
};
