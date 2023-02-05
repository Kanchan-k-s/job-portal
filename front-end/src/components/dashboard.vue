

<template>
    <div>
        <head-er v-bind:count="count"></head-er>
        <h1 class="text-center">WELCOME PROVIDER</h1>
        <div class="container">

            <div id="right">
                <add-post v-on:apply="updatePost($event)"></add-post>
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>New Request</th>
                            <th>Job Name</th>
                            <th>Job Description</th>
                            <th>Job Action 1</th>
                            <th>Job Action 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="job in jobs" @mouseover="job.hover = true" @mouseleave="job.hover = false"
                            :class="{ 'active-row': job.hover }">
                            <td><span class="badge text-wrap float-start"
                                    :class="job.count > 0 ? 'bg-primary' : 'bg-danger'">{{ job.count }}</span></td>
                            <td>{{ job.job_name }}</td>
                            <td>{{ job.job_description }}</td>
                            <td><delete-post v-bind:id=job.job_id v-on:delPost="delPost($event)"></delete-post></td>
                            <td><router-link v-bind:to="'/request/' + job.job_id">View
                                    Requests</router-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>

<script>

import addPost from './addPost.vue'
import deletePost from './deletePost.vue'
import header from './header.vue'

export default {

    components: {
        'add-post': addPost,
        'delete-post': deletePost,
        'head-er': header,
    },
    data() {
        return {
            jobs: [],
            count: 0
        }
    },
    methods: {
        calculateSum: function (array, property) {
            const total = array.reduce((accumulator, object) => {
                return accumulator + Number(object[property]);
            }, 0);

            return total;
        },
        logout: function () {
            if (this.$session.exists()) {
                this.$http.delete('http://localhost:3000/user/').then(function (data) {
                    this.$router.push('/login')
                })
            } else {
                this.$router.push('/login')
            }
            this.$session.destroy();
        },
        updatePost: function (e) {
            e['count'] = 0;
            this.jobs.push(e);
            this.count = this.calculateSum(this.jobs, 'count')
        },
        delPost: function (id) {
            this.jobs = this.jobs.filter(item => item.job_id != id)
            this.count = this.calculateSum(this.jobs, 'count')
        }
    },
    beforeCreate() {
        if (this.$session.exists() && this.$session.get('userid') === this.$route.params.id) {
            this.$http.get('http://localhost:3000/post/' + this.$route.params.id).then(function (data) {
                let temp = data.body.map((d) => ({
                    ...d, hover: false
                }))
                this.jobs = temp;

                this.count = this.calculateSum(this.jobs, 'count')
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
