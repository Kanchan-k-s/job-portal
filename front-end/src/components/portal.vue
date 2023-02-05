

<template>
    <div>
        <nav-bar></nav-bar>
        <h1 class="text-center">WELCOME SEEKER</h1>
        <div class="container">

            <table class="styled-table">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Job Name</th>
                        <th>Job Description</th>
                        <th>Job Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="job in jobs" @mouseover="job.hover = true" @mouseleave="job.hover = false"
                        :class="{ 'active-row': job.hover }">
                        <td>{{ job.user_name }}</td>
                        <td>{{ job.job_name }}</td>
                        <td>{{ job.job_description }}</td>
                        <td><button class="btn btn-warning" v-on:click="apply(job.job_id)">Apply</button></td>
                    </tr>
                </tbody>


            </table>
        </div>

    </div>


</template>

<script >
import navbar from './navbar.vue'
export default {
    components: {
        'nav-bar': navbar
    }, data() {
        return {
            jobs: [],

        }
    },
    methods: {
        apply: function (id) {

            this.$http.post('http://localhost:3000/meet/', {
                user_id: this.$route.params.id,
                job_id: id
            }
            ).then(function (data) {
                this.jobs = this.jobs.filter(item => item.job_id != id)
            })
        }
    },
    beforeCreate() {
        if (this.$session.exists() && this.$session.get('userid') === this.$route.params.id) {
            this.$http.get('http://localhost:3000/post/apply/' + this.$route.params.id).then(function (data) {
                let temp = data.body.map((d) => ({
                    ...d, hover: false
                }))

                this.jobs = temp;
            })
        } else {
            this.$router.push('/')
        }

    },
}
</script>

<style scoped>
.container {
    max-width: 1000px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    width: 1000px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
}

.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}
</style>