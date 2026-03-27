<template>
  <nav v-if="isAuthenticated" class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand" to="/">Mi App</router-link>

    <div class="d-flex ms-auto align-items-center gap-3">
      <router-link class="nav-link text-white" to="/">Home</router-link>
      <router-link class="nav-link text-white" to="/about">About</router-link>
      <span class="text-white-50 small">{{ userEmail }}</span>
      <button class="btn btn-outline-light btn-sm" @click="handleLogout">
        Cerrar sesión
      </button>
    </div>
  </nav>

  <router-view />
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const userEmail = computed(() => store.getters['auth/currentUser']?.email)

async function handleLogout() {
  await store.dispatch('auth/logout')
  router.push('/login')
}
</script>
