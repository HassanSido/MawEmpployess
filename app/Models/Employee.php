<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Wdays;
class Employee extends Model
{
    use HasFactory;
    protected $fillable = [
        'LastName',
        'FirstName',
        'Phone',
        'Stauts',
        'FolderName',

    ];
    public function days()
    {
        return $this->hasMany(Wdays::class, 'employee_id');

    }
}
