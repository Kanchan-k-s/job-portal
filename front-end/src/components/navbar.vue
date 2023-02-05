

<template>
    <nav class="navbar navbar-expand-lg sticky-top  " style="background-color: #009879; height:10vh;color: #ffffff;">
        <div class="container-md">
            <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="Logo" width="50" height="50"
                style="border: 3px solid yellow; border-radius:50%" class="d-inline-block align-text-top">
            <div class="collapse navbar-collapse" id="navbarSupportedContent" style="margin-left:3%">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">


                    <li class="nav-item ">
                        <router-link v-bind:to="'/portal/' + this.$route.params.id" class="nav-link"
                            style="color:#ffffff; font-weight: 600;">
                            Apply for jobs</router-link>
                    </li>

                    <li class="nav-item ">
                        <router-link v-bind:to="'/applied/' + this.$route.params.id" class="nav-link"
                            style="color:#ffffff; font-weight: 600;">Applied for
                            jobs</router-link>
                    </li>
                    <li class="nav-item ">
                        <router-link v-bind:to="'/resume/' + this.$route.params.id" class="nav-link"
                            style="color:#ffffff; font-weight: 600;">Resume</router-link>
                    </li>


                </ul>
                <form class="d-flex" role="search">
                    <button class="btn btn-warning" v-on:click="logout" style="padding:20%;">Logout</button>
                </form>
            </div>
        </div>
    </nav>

</template>
<script >
export default {
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
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

    },
    computed: {

    }
}
</script>


<style scoped>
.router-link-active {
    background: #095142;
    color: rgb(255, 255, 255);
}
</style>