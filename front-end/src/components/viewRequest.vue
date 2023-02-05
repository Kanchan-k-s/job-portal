

<template>

    <div>
        <head-er></head-er>

        <h1 class="text-center">Job Name: {{ job.job_name }} </h1>
        <h6 class="text-center">Description: {{ job.job_description }}</h6>
        <div class="text-center">
            <select style="padding:5px" v-model="status">
                <option v-bind:value=0>Pending</option>
                <option v-bind:value=-1>Rejected</option>
                <option v-bind:value=1>Accepted</option>
            </select>
        </div>
        <div class='parent' v-for="user in users">
            <div class='child' v-if="status === user.sta">
                <div>
                    <h4 style="text-decoration:underline">{{ user.name }}</h4>
                    <h6>Contact: {{ user.cont }} | Email: {{ user.email }} </h6><br>
                    <div style="text-align:left">
                        <p>
                            <b>OBJECTIVE: </b><br>
                            {{ user.obj }}
                        </p>
                        <p>
                            <b>SKILLS: </b><br>
                            {{ user.skill }}
                        </p>
                        <p>
                            <b>WORK - EXPERIENCE: </b><br>
                            {{ user.work }}
                        </p>
                        <p>
                            <b>EDUCATION: </b><br>
                            {{ user.edu }}
                        </p>
                    </div>
                    <div v-if="status === 0">
                        <button class="btn btn-success" v-on:click="accept(user)"
                            style="margin-right:2%">Accept</button>
                        <button class="btn btn-danger" v-on:click="reject(user)">Reject</button>
                    </div>

                </div>
            </div>
        </div>
    </div>


</template>

<script >

import header from './header.vue'
export default {
    components: {
        'head-er': header,
    },
    props: {

    },
    data() {
        return {
            users: [],
            job: {},
            status: null
        }
    },
    methods: {

        reject: function (id) {
            this.$http.post('http://localhost:3000/meet/reject/' + id.user_id + '/' + this.$route.params.id, {
            }).then(function (data) {
                this.users[this.users.indexOf(id)].sta = -1
            })
        },
        accept: function (id) {
            this.$http.post('http://localhost:3000/meet/accept/' + id.user_id + '/' + this.$route.params.id, {
            }).then(function (data) {
                this.users[this.users.indexOf(id)].sta = 1

            })
        }
    },
    beforeCreate() {
        if (this.$session.exists()) {
            this.$http.get('http://localhost:3000/meet/apply/' + this.$route.params.id).then(function (data) {
                if (this.$session.get('userid') === data.body.job.user_id) {
                    this.users = data.body.meet;
                    this.job = data.body.job
                    this.status = 0;
                } else {
                    this.$router.push('/')
                }

            })
        } else {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.parent {
    text-align: center;
}

.child {
    /* display: inline-block; */
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
    border: 2px solid rgb(17, 17, 97);
    padding: 1rem 1rem;
    width: 600px;
    align-self: center;
    margin-top: 2%;

}
</style>