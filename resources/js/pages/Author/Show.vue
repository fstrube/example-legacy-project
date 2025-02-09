<template>
    <AppLayout>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <p>Viewing posts by {{ author.name }}...</p>
                    <p v-if="!posts.length">
                        There are no posts by this user.
                    </p>
                    <div class="card my-2" v-for="post in posts" :key="post.id">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">{{ (post.author || {}).name || 'Somebody' }} said...</h6>
                            <p class="card-text">{{ post.content }}</p>
                            <a class="card-link">Repost</a>
                            <a class="card-link">Like</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script>
    import { defineComponent } from 'vue'
    import AppLayout from '../../layouts/App.vue'

    export default defineComponent({
        props: {
            author: Object,
            posts: Array,
        },
        components: {
            AppLayout,
        }
    })
</script>
