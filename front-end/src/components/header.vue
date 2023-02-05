

<template>
    <nav class="navbar navbar-expand-lg sticky-top  " style="background-color: #009879; height:10vh;color: #ffffff;">
        <div class="container-md">
            <div class="notification">
                <span>
                    <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="Logo" width="50"
                        height="50" class="d-inline-block align-text-top">
                </span>
                <span class="badge">{{ count }}</span>
            </div>

            <div class="collapse navbar-collapse" id="navbarSupportedContent" style="margin-left:3%">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item ">
                        <router-link v-bind:to="'/dashboard/' + this.$session.get('userid')" class="nav-link">
                            Job Action</router-link>
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
    props:
    {
        count: {
            Number
        }
    }
    ,
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
.notification {
    position: relative;
    display: inline-block;
}

.notification .badge {
    position: absolute;
    top: -2px;
    right: -10px;
    /* padding: 5px 10px; */
    border-radius: 50%;
    background: yellow;
    color: black;
}

.router-link-active {
    background: #095142;
    color: rgb(255, 255, 255);
}

.nav-link {
    color: rgb(255, 255, 255);
}
</style>