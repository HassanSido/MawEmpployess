<script setup>
import BreezeAuthenticatedLayout from '@/Layouts/Authenticated.vue';
import { Head } from '@inertiajs/inertia-vue3';
</script>

<template>

    <Head title="Dashboard" />

    <BreezeAuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        You're logged in!
                    </div>
                </div>
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
                <div>
                    <h1>Testing</h1>
                    <table id="wdays" class="table table-striped table-bordered mt-4" role="grid"
                        aria-describedby="user-list-page-info">
                        <thead>
                            <tr>

                                <th>#</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Workplace</th>
                                <th>Price</th>

                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
                <div>
                    <div v-for=" (Work,index) of DaysTable" :key="Work">
                        <h3>{{index}}</h3>
                        <table id="" class="table table-striped table-bordered mt-4" role="grid"
                            aria-describedby="user-list-page-info">
                            <thead>
                                <th>NO:</th>
                                <th>name</th>
                                <th>day</th>
                                <th>time</th>
                                <th>place</th>
                                <th>rank</th>
                                <th>system</th>
                                <th>date of receipt</th>
                                <th>observation</th>
                            </thead>
                            <tbody>
                                <tr v-for="(day,index) of Work" :key="day">
                                    <td>{{ index }}</td>
                                    <td></td>
                                    <td>{{day['day']}}</td>
                                    <td>{{day['time']}}</td>
                                    <td>{{day['place']}}</td>
                                    <td>{{day['price']}}</td>
                                    <td>Monthly</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <div v-for=" (Month,index) of Months" :key="Month">
                        <h1>{{ parseInt(index) + 1}}</h1>
                        <div v-for=" (check,index) of Month" :key="check">
                            <h3 v-if="JSON.stringify(check) !== '{}' && index == 'frist'">1-15</h3>

                            <h3 v-if="JSON.stringify(check) !== '{}' && index == 'last'">15-30</h3>


                            <table id="" v-if="JSON.stringify(check) !== '{}'" class=" table table-striped table-bordered
                                mt-4" role="grid" aria-describedby="user-list-page-info">
                                <thead>

                                    <th>select</th>
                                    <th>NO:</th>
                                    <th>name</th>
                                    <th>nomber of days</th>
                                    <th>salary</th>
                                    <th>date</th>
                                    <th>observation</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(day,index) of check" :key="day">
                                        <td></td>
                                        <td>{{ index }}</td>
                                        <td></td>
                                        <td>{{day['days']}} Days</td>
                                        <td>{{day['price']}}</td>
                                        <td></td>
                                        <td>Monthly</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {{ Months }}
    </BreezeAuthenticatedLayout>
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
                        { "data": "FristName" },
                        { "data": "LastName" },
                        { "data": "Phone" },

                        { "data": "Stauts" },
                        {

                            orderable: false,
                            "data": null,
                            "render": function (data, type, full, meta) {
                                return `<button type="button">Transfer</button>`;
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

