<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div v-if="user" class="card mb-2">
                    <div class="card-body">
                        <textarea class="form-control mb-2" v-model="post.content"></textarea>

                        <button class="btn btn-primary w-100" type="button" @click.prevent="createPost()">Create Post</button>
                    </div>
                </div>
                <div v-if="posts === null" class="progress">
                    <div class="progress-bar progress-bar-animated progress-bar-striped w-100"></div>
                </div>
                <div class="card my-2" v-for="post in posts" :key="post.id">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted"><a :href="`/author/${post.author.id}`">{{ (post.author || {}).name || 'Somebody' }}</a> said...</h6>
                        <p class="card-text">{{ post.content }}</p>
                        <a class="card-link">Repost</a>
                        <a class="card-link">Like</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            user: Object,
        },

        data() {
            return {
                posts: null,
                post: {
                    content: '',
                },
            };
        },

        methods: {
            createPost() {
                axios.post('/api/posts', { content: this.post.content })
                    .then(response => axios.get('/api/posts'))
                    .then(response => {
                        this.posts = response.data;
                        this.post.content = '';
                    });
            },
        },

        mounted() {
            axios.get('/api/posts').then(response => {
                this.posts = response.data;
            });
        }
    }
</script>

<style>
    .card-link {
        cursor: pointer;
    }
</style>
