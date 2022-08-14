<script setup>
import BreezeAuthenticatedLayout from '@/Layouts/Authenticated.vue';
import { Head } from '@inertiajs/inertia-vue3';
</script>

<template>

    <Head title="Emmployees" />


    <SideNav />
    <div class="main">
        <header class="header">
            <section class="flex">
                <div>
                    <h1>معلومات اليوم</h1>
                </div>
            </section>
        </header>
        <div class="input">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                data-bs-whatever="@mdo">ADD</button>

        </div>
        <div class="table-1">

            <div>
                <table id="user-list-table" class="table table-striped table-bordered mt-4" role="grid"
                    aria-describedby="user-list-page-info">
                    <thead>
                        <tr>

                            <th>#</th>
                            <th>ID</th>
                            <th>Frist Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>File</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="employees/Added" method="post" enctype="multipart/form-data">

                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Family name:</label>
                            <input type="text" class="form-control" name="LastName" id="recipient-name">
                            <input type="hidden" class="form-control" name="_token" :value="csrf">
                        </div>
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Frist name:</label>
                            <input type="text" class="form-control" name="FirstName" id="recipient-name">
                        </div>
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Folder name:</label>
                            <input type="text" class="form-control" name="FolderName" id="recipient-name">
                        </div>
                        <div class="mb-3">
                            <label for="recipient-name" name="Phone" class="col-form-label">Phone:</label>
                            <input type="text" class="form-control" name="Phone" id="recipient-name">
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="Submit" class="btn btn-primary">ADD</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style >
.form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #000;
    background-color: #fff0;
    background-clip: padding-box;
    border: 1px solid #ced4da00;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.375rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
.form-control:focus {
    color: #0080ff;
    background-color: #fff0;
    border-color: #86b7fe00;
    outline: 0;
    box-shadow: 0 0 0 .25remrgba(13, 110, 253, .25);
}
</style>
<script>

import SideNav from '@/Components/SideNav.vue';

export default {

    components: {
        SideNav
    },
    data() { return {
        csrf:'',
        Days:[],
        DaysTable:{},
        Months:{},
        employees:[],
        studentData :[
            {
                ID: "01",
                Name: "Abiola Esther",
                Course: "Computer Science",
                Gender: "Female",
                Age: "17",
            },
            {
                ID: "02",
                Name: "Robert V. Kratz",
                Course: "Philosophy",
                Gender: "Male",
                Age: "19",
            },
            {
                ID: "03",
                Name: "Kristen Anderson",
                Course: "Economics",
                Gender: "Female",
                Age: "20",
            },
            {
                ID: "04",
                Name: "Adam Simon",
                Course: "Food science",
                Gender: "Male",
                Age: "21",
            },
            {
                ID: "05",
                Name: "Daisy Katherine",
                Course: "Business studies",
                Gender: "Female",
                Age: "22",
            },
        ], fields: ["ID", "Name", "Course", "Gender", "Age"]
    }
    },
    mounted() {
        let vue = this
        let wdaysTable ='';
        vue['csrf'] = $('meta[name="csrf-token"]').attr('content');
        axios.get('/employees')
            .then(function (response) {
                // handle success
                vue.employees = response.data

                $("#user-list-table").DataTable({
                    'data': vue.employees,
                    "columns": [
                        {

                            orderable: false,
                            "data": null,
                            "render": function (data, type, full, meta) {
                                return `<input type="checkbox" >`;
                            }
                        },
                        { "data": "id" },
                        { "data": "FirstName" },
                        { "data": "LastName" },
                        { "data": "Phone" },

                        {

                            orderable: false,
                            "data": null,
                            "render": function (data, type, full, meta) {
                                return `<select class="form-control" >
                                <option value="1" ${data['Stauts'] == 1 ? 'selected' : ''}>Active</option>
                                <option value="0" ${data['Stauts'] != 1 ? 'selected' : ''}>Disactive</option>
                                </select>`;
                            }
                        },
                        {

                            orderable: false,
                            "data": null,
                            "render": function (data, type, full, meta) {
                                return `<a href='/add/Days/${data['id']}'><button type="button">Transfer</button></a>`;
                            }
                        },
                        {
                            "data": null,
                            "render": function (data, type, full, meta) {
                                return `<button type="button">Transfer</button>`;
                            }
                        },
                    ]
                })
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
        let days = new Map()
        let Months = new Map()
        let employee = new Map()
        axios.get('/show/Days')
            .then(function (response) {
                response.data.forEach(element => {
                    let month = new Date(element.day).getMonth()
                    let dayT = new Date(element.day).getDate()
                    let dem = element
                    if (Months.has(month)) {

                        if (dayT > 1 && dayT < 15) {
                            if (employee.has(dem['employee_id'])) {
                                let em = employee.get(dem['employee_id'])
                                em['days'] = em['days'] + 1
                                em['price'] = parseInt(em['price']) + parseInt(dem['price'])
                                vue.Months[month]['frist'][dem['employee_id']] = employee.get(dem['employee_id'])

                                employee.set(dem['employee_id'], em)
                            } else {
                                dem['days'] = 1
                                employee.set(dem['employee_id'], dem)
                                vue.Months[month]['frist'][dem['employee_id']] = employee.get(dem['employee_id'])
                            }


                        } else {

                            if (employee.has(dem['employee_id'])) {
                                let em = employee.get(dem['employee_id'])
                                em['days'] = em['days'] + 1
                                em['price'] = parseInt(em['price']) + parseInt(dem['price'])
                                vue.Months[month]['last'][dem['employee_id']] = employee.get(dem['employee_id'])

                                employee.set(dem['employee_id'], em)
                            } else {
                                dem['days'] = 1
                                employee.set(dem['employee_id'], dem)
                                vue.Months[month]['last'][dem['employee_id']] = employee.get(dem['employee_id'])
                            }
                        }
                    } else {
                        Months.set(month, dem)
                        vue.Months[month] = { frist: {}, last: {} }
                        console.log(dem)
                        dem['days'] = 1
                        if (dayT > 1 && dayT < 15) {
                            employee.set(dem['employee_id'], dem)
                            vue.Months[month]['frist'][dem['employee_id']] = employee.get(dem['employee_id'])

                        } else {
                            employee.set(dem['employee_id'], dem)
                            vue.Months[month]['last'][dem['employee_id']] = employee.get(dem['employee_id'])
                        }
                    }
                })
            })
            axios.get('/show/Days')
            .then(function (response) {
                // handle success
                vue.Days = response.data

                response.data.forEach(element => {


                 if(days.has(element.day)){
                     vue.DaysTable[element.day].push(element)
                 }else{
                     days.set(element.day)
                     vue.DaysTable[element.day] =[]
                     vue.DaysTable[element.day].push(element)
                 }


                });
               wdaysTable = $("#wdays").DataTable({
                    'data': vue.Days,
                    "columns": [
                        {

                            orderable: false,
                            "data": null,
                            "render": function (data, type, full, meta) {
                                return `<input type="checkbox" class="form-control w-25 p-3" >`;
                            }
                        },
                        { "data": "id" },
                        {

                            orderable: false,
                            "data": null,
                            "render": function (data, type, full, meta) {
                                return ;
                            }
                        },
                        {

                            orderable: false,
                            "data": null,
                            "render": function (data, type, full, meta) {
                                return `<input type="Date" id='date-${data['id']}' name="data" value='${data['day']}' class="form-control change" >`;
                            }
                        },
                        {

                            orderable: false,
                            "data": null,
                            "render": function (data, type, full, meta) {
                                return `<select id='time-${data['id']}' class="form-control change">
                                <option>Nite</option>
                                <option>Morning</option>
                                </select>`;
                            }
                        },
                        {

                            orderable: false,
                            "data": null,
                            "render": function (data, type, full, meta) {
                                return `<select id='place-${data['id']}' class="form-control change ">
                                <option>Test</option>
                                <option>Test</option>
                                </select>`;
                            }
                        },
                        {

                            orderable: false,
                            "data": null,
                            "render": function (data, type, full, meta) {
                                return `<input type="number" id='price-${data['id']}' name="data" value="${data['price']}" class="form-control change" >`;
                            }
                        },

                    ]
                })

                $('.change').change(function () {
                    let cell = wdaysTable.row($(this).closest("td")).data().id;
                    console.log(wdaysTable.row($(this).closest("td")).data().id   );
                    axios.post('/Update/Days/'+cell, {
                        price: $('#price-' + cell).val() ,
                        place: $('#place-' + cell).val(),
                        time: $('#time-' + cell).val(),
                        day: $('#date-' + cell).val()
                    })
                        .then(function (response){
                            console.log(response);
                        })
                   console.log($('#price-' + cell).val());
                    console.log($('#place-' + cell).val());
                    console.log($('#time-' + cell).val());
                    console.log($('#date-' + cell).val());


                });
                console.log(response);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

        },

};
</script>

