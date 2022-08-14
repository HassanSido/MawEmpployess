import _ from 'lodash';
window._ = _;

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });
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
