<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="card shadow-sm" style="width: 100%; max-width: 420px;">
      <div class="card-body p-4">
        <h2 class="card-title text-center mb-4">Crear cuenta</h2>

        <div v-if="error" class="alert alert-danger py-2" role="alert">
          {{ error }}
        </div>

        <form @submit.prevent="handleRegister">
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

          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
              placeholder="••••••••"
              minlength="6"
              required
            />
          </div>

          <div class="mb-4">
            <label for="confirm" class="form-label">Confirmar contraseña</label>
            <input
              id="confirm"
              v-model="confirm"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': passwordMismatch }"
              placeholder="••••••••"
              required
            />
            <div v-if="passwordMismatch" class="invalid-feedback">
              Las contraseñas no coinciden.
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-success w-100"
            :disabled="loading || passwordMismatch"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm me-2"
              role="status"
            />
            {{ loading ? 'Registrando...' : 'Registrarse' }}
          </button>
        </form>

        <hr />

        <p class="text-center mb-0">
          ¿Ya tienes cuenta?
          <router-link to="/login">Inicia sesión</router-link>
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
const confirm = ref('')

const loading = computed(() => store.getters['auth/isLoading'])
const error = computed(() => store.getters['auth/authError'])
const passwordMismatch = computed(
  () => confirm.value.length > 0 && password.value !== confirm.value
)

async function handleRegister() {
  if (passwordMismatch.value) return
  try {
    await store.dispatch('auth/register', {
      email: email.value,
      password: password.value,
    })
    router.push('/')
  } catch {
    // el error ya está en el store
  }
}
</script>
