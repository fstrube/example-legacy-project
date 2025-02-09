<template>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="/">
                    Postr
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        <template v-if="!$page.props.user">
                            <li class="nav-item">
                                <a class="nav-link" :href="route('login')">Login</a>
                            </li>
                            <li v-if="route().has('register')" class="nav-item">
                                <a class="nav-link" :href="route('register')">Register</a>
                            </li>
                        </template>
                        <template v-else>
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click.prevent="showNavDropdown = !showNavDropdown">
                                    {{ $page.props.user.name }}
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown" :class="{show: showNavDropdown }">
                                    <a class="dropdown-item" :href="route('logout')"
                                       @click.prevent="logout()">
                                        Logout
                                    </a>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <slot />
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        data() {
            return {
                showNavDropdown: false,
            }
        },
        methods: {
            logout() {
                // TODO implement logout
            }
        }
    })
</script>
