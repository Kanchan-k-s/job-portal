

<template>
    <div class="container">
        <div class="card text-start" style="width: 25rem;color:black">
            <div class="card-body" style="padding:7%">
                <h5 class="card-title text-center">Add Job</h5>

                <input v-model="job.name" type="text" placeholder="Job Name" style="" /><br>
                <input v-model="job.despcription" type="text" placeholder="Job description" /><br>

                <div>
                    <button class="btn btn-success" v-on:click="apply"
                        style="padding:5px 30px 5px 30px;margin-left:35%;margin-top: 5%;">Add</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>


export default {
    components: {

    },
    data() {
        return {
            job: {}
        }
    },
    methods: {
        apply: function () {

            this.job['user_id'] = this.$route.params.id

            this.$http.post('http://localhost:3000/post/', this.job
            ).then(function (data) {

                this.job = {}
                this.$emit('apply', data.body)
            })
        }
    }

}
</script>

<style scoped>
.container {
    margin-left: 25%;
}

input {
    padding: 10px;
    width: 100%;
    margin-top: 2%;
}
</style>
