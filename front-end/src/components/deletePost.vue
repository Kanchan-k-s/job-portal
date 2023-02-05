

<template>

    <button class="btn profile-edit-btn" v-on:click.prevent="delPost(id)">Delete</button>

</template>

<script >
export default {
    props: {
        id: {
            type: Number
        }
    },
    methods: {
        delPost: function (id) {
            this.$http.delete('http://localhost:3000/post/' + this.id, {
            }).then(function (data) {

                this.$emit('delPost', id);
            })
        }
    }
}
</script>

<style scoped>

</style>