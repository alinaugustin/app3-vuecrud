/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
      token: localStorage.getItem('token') || '',
      user: localStorage.getItem('user') || ''
    },
    mutations: {
      auth_request(state) {
        state.status = 'loading'
      },
      auth_success(state, token, user) {
        state.status = 'success'
        state.token = token
        state.user = user
      },
      auth_error(state) {
        state.status = 'error'
      },
      logout(state) {
        state.status = ''
        state.token = ''
        //state.user = ''
      },
      userState (state, { user }) {
        state.user.id = user.id,
        state.user.nr = user.nr,
        state.user.username = user.username,
        state.user.email = user.email
      }
    },
    actions: {
      login({ commit }, user) {
        return new Promise((resolve, reject) => {
          commit('auth_request'),
          axios({ url: 'http://localhost:4000/login', data: user, method: 'POST' })
            .then(resp => {
              const token = resp.data.token
              //const objuser = JSON.stringify(resp.data.user._id)
              //const user = objuser.slice(0,34)
              //user.length = 4
              //console.log('user: ',user)
              localStorage.setItem('token', token)
              //user.remove('password')
              //localStorage.setItem('user', user)
              // Add the following line:
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', token)
              resolve(resp)
              //return user
            })
            .catch(err => {
              commit('auth_error')
              localStorage.removeItem('token')
              //localStorage.removeItem('user')
              reject(err)
            })
        })
      },
      // async userState ({ commit }) {
      //   const response = await axios.get('/user')
      //   commit('userState', {
      //     user: response.data,
      //     meta: {
      //       analytics: [
      //         ['set', 'userId', response.data.id],
      //         ['set', 'nr', response.data.id],
      //         ['set', 'email', response.data.id],
      //         ['set', 'username', response.data.id]
      //       ]
      //     }
      //   })
      // },
      register({ commit }, user) {
        return new Promise((resolve, reject) => {
          commit('auth_request'),
          axios({ url: 'http://localhost:4000/register', data: user, method: 'POST' })
            .then(resp => {
              const token = resp.data.token
              const user = resp.data.user
              // console.log('user:',user)
              localStorage.setItem('token', token)
              //localStorage.setItem('user', user)
              // Add the following line:
              axios.defaults.headers.common['Authorization'] = token
              commit('auth_success', token, user)
              resolve(resp)
            })
            .catch(err => {
              commit('auth_error', err)
              localStorage.removeItem('token')
              //localStorage.removeItem('user')
              reject(err)
            })
        })
      },
      logout({ commit }) {
        return new Promise((resolve, reject) => {
          commit('logout')
          localStorage.removeItem('token')
          //localStorage.removeItem('user')
          delete axios.defaults.headers.common['Authorization']
          resolve()
          reject()
        })
      }
    },
    getters: {
      isLoggedIn: state => !!state.token,
      authStatus: state => state.status,
      //userState: state => state.user
      // userState: state => state.user
    }
  })