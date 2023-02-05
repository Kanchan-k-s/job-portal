

<template>
    <div>
        <nav-bar></nav-bar>
        <h1 class="text-center">Resume</h1>

        <div class='parent'>
            <div class='child'>
                <h5>RESUME PREVIEW</h5>
                <div>
                    <h4 style="text-decoration:underline">{{ newuser.name }}</h4>
                    <h6>Contact: {{ newuser.cont }} | Email: {{ newuser.email }} </h6><br>
                    <div style="text-align:left">
                        <p>
                            <b>OBJECTIVE: </b><br>
                            {{ newuser.obj }}
                        </p>
                        <p>
                            <b>SKILLS: </b><br>
                            {{ newuser.skill }}
                        </p>
                        <p>
                            <b>WORK - EXPERIENCE: </b><br>
                            {{ newuser.work }}
                        </p>
                        <p>
                            <b>EDUCATION: </b><br>
                            {{ newuser.edu }}
                        </p>
                    </div>
                    <button class="btn btn-primary text-center" v-on:click="show">Clear Old resume</button>
                </div>

            </div>
            <div class='child text-start'>
                <h6 v-show="s">*Resume Updated</h6>
                <h4>UPDATE RESUME</h4>

                <label class="form-label"><b>FULL NAME:</b></label>
                <input type="text" class="form-control" v-model="user.name" placeholder="Full Name">
                <label class="form-label"><b>Contact:</b> </label>
                <input type="text" class="form-control" v-model="user.cont" placeholder="Phone Number">
                <label class="form-label"><b>Email:</b> </label>
                <input type="email" class="form-control" v-model="user.email" placeholder="Email">
                <label class="form-label"><b>OBJECTIVE:</b> </label>
                <input type="text" class="form-control" v-model="user.obj" placeholder="To be a hardworking...">
                <label class="form-label"><b>SKILLS:</b> </label>
                <input type="text" class="form-control" v-model="user.skill" placeholder="Cooking, HTML, Adaptive...">
                <label class="form-label"><b>WORK - EXPERIENCE:</b> </label>
                <input type="text" class="form-control" v-model="user.work" placeholder="Project 1- The project...">
                <label class="form-label"><b>EDUCATION:</b> </label>
                <input type="text" class="form-control" v-model="user.edu" placeholder="Education">
                <button class="btn btn-primary text-center" v-on:click="updateResume"
                    style="margin-top:2%">Update</button>
            </div>
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
            user: {},
            newuser: {},
            s: false
        }
    },
    methods: {
        updateResume: function () {
            this.$http.put('http://localhost:3000/user/resume/' + this.$route.params.id, this.user).then(function (data) {
                this.user = {}
                this.s = true;
            })
        },
        show: function () {
            this.newuser = this.user;
            this.s = false;
        }
    },
    beforeCreate() {
        if (this.$session.exists() && this.$session.get('userid') === this.$route.params.id) {
            this.$http.get('http://localhost:3000/user/resume/' + this.$route.params.id).then(function (data) {
                this.newuser = data.body[0];
            })
        } else {
            this.$router.push('/')
        }

    },
}
</script>

<style scoped>
.parent {
    text-align: center;
}

.child {
    display: inline-block;
    border: 2px solid rgb(17, 17, 97);
    padding: 1rem 1rem;
    width: 600px;
    margin-left: 50px;
    vertical-align: middle;
}
</style>