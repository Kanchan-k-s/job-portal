

<template>
    <div>
        <nav-bar></nav-bar>
        <h1 class="text-center">YOU APPLYIED</h1>
        <div class="container">

            <table class="styled-table">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Job Name</th>
                        <th>Job Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="meet in meets" @mouseover="meet.hover = true" @mouseleave="meet.hover = false"
                        :class="{ 'active-row': meet.hover }">
                        <td>{{ meet.user_name }}</td>
                        <td>{{ meet.job_name }}</td>
                        <td>{{ meet.job_description }}</td>
                        <td v-if="meet.sta === 1">Accepted</td>
                        <td v-else-if="meet.sta === -1">Rejected</td>
                        <td v-else>Pending</td>
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
            meets: []
        }
    },
    methods: {

    },
    beforeCreate() {
        if (this.$session.exists() && this.$session.get('userid') === this.$route.params.id) {
            this.$http.get('http://localhost:3000/meet/' + this.$route.params.id).then(function (data) {

                let temp = data.body.map((d) => ({
                    ...d, hover: false
                }))

                this.meets = temp;
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