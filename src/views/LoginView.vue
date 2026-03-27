<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="card shadow-sm" style="width: 100%; max-width: 420px;">
      <div class="card-body p-4">
        <h2 class="card-title text-center mb-4">Iniciar sesión</h2>

        <div v-if="error" class="alert alert-danger py-2" role="alert">
          {{ error }}
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Correo electrónico</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div class="mb-4">
            <label for="password" class="form-label">Contraseña</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="loading"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm me-2"
              role="status"
            />
            {{ loading ? 'Ingresando...' : 'Ingresar' }}
          </button>
        </form>

        <hr />

        <p class="text-center mb-0">
          ¿No tienes cuenta?
          <router-link to="/register">Regístrate</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const loading = computed(() => store.getters['auth/isLoading'])
const error = computed(() => store.getters['auth/authError'])

async function handleLogin() {
  try {
    await store.dispatch('auth/login', {
      email: email.value,
      password: password.value,
    })
    router.push('/')
  } catch {
    // el error ya está en el store
  }
}
</script>
