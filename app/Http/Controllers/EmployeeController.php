<?php

namespace App\Http\Controllers;
use App\Models\Wdays;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addDay(Employee $employee,$id)
    {
        $employee = Employee::find($id);
        Wdays::create(['employee_id'=>$id,'Name'=>$employee['LastName'].$employee['FirstName']]);
        return 'hello';
        //
    }
    public function ShowDays()
    {
       return Wdays::orderBy('day', 'ASC')->get();

        //
    }
    public function vaild(){
        return Wdays::where('vaild',1)->get();
    }
    public function unvaild(){
        return Wdays::where('vaild',1)->update(['vaild'=>0]);
    }
    public function UpdateDays(Request $request,$id)
    {
      $day =  Wdays::find($id);

      $day->update($request->all());
       return $request;

        //
    }
    public function store(Request $request)
    {
        $request['Stauts'] = 1;
        $request['vaild'] = 1;
          Employee::create($request->all());
return back();
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function show(Employee $employee)
    {
        //
        return Employee::get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
