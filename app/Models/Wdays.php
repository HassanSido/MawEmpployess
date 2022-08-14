<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Employee;
class Wdays extends Model
{
    use HasFactory;
      protected $fillable = [
        'employee_id','Name','day','price','place','Note','System','vaild','late_min','cut_price','late_note'
    ];
    public function employee()
{

    return $this->belongsTo(Employee::class, 'employee_id', 'id');
}

}
