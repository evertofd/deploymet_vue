import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '@/firebase'

export default {
  namespaced: true,

  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
    authError: (state) => state.error,
    isLoading: (state) => state.loading,
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_ERROR(state, message) {
      state.error = message
    },
    CLEAR_ERROR(state) {
      state.error = null
    },
  },

  actions: {
    async register({ commit }, { email, password }) {
      commit('SET_LOADING', true)
      commit('CLEAR_ERROR')
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        commit('SET_USER', { uid: user.uid, email: user.email })
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async login({ commit }, { email, password }) {
      commit('SET_LOADING', true)
      commit('CLEAR_ERROR')
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        commit('SET_USER', { uid: user.uid, email: user.email })
      } catch (error) {
        commit('SET_ERROR', error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async logout({ commit }) {
      await signOut(auth)
      commit('SET_USER', null)
    },

    initAuthListener({ commit }) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit('SET_USER', { uid: user.uid, email: user.email })
        } else {
          commit('SET_USER', null)
        }
      })
    },
  },
}
