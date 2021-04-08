import Vue from 'vue'
import Vuex from 'vuex'
import {API_ROUTES} from "../routes";
import axios from "axios";

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    products: [],
    orders: [],
    statuses: []
  },
  mutations: {
    SET_PRODUCTS_TO_STATE: (state, products) => {
      state.products = products;
    },
    SET_ORDERS_TO_STATE: (state, orders) => {
      state.orders = orders
    },
    SET_STATUSES_TO_STATE: (state, statuses) =>{
      state.statuses = statuses
    },
    REMOVE_FROM_ORDER: (state, orderId) => {
      state.orders = state.orders.filter((order) =>{
        return order.id !== orderId
      })
    }
  },
  actions: {
    GET_PRODUCTS_FROM_API(context) {
      return axios.get(API_ROUTES.GET_PRODUCTS)
          .then((products) => {
            context.commit('SET_PRODUCTS_TO_STATE', products.data);
            return products;
          })
          .catch((error) => {
            console.log(error)
            return error
          })
    },
    GET_STATUSES_FROM_API(context){
      return axios.get(API_ROUTES.GET_STATUSES)
          .then((statuses) => {
            context.commit('SET_STATUSES_TO_STATE', statuses.data);
            return statuses;
          })
          .catch((error) => {
        console.log(error)
        return error
      })
    },
    GET_ORDERS_FROM_API(context){
      return axios.get(API_ROUTES.GET_ORDERS)
          .then((orders) => {
            context.commit('SET_ORDERS_TO_STATE', orders.data);
            return orders;
          })
          .catch((error) => {
            console.log(error)
            return error
          })
    },
    ADD_TO_ORDER({commit}, selectedProduct) {
      commit('SET_ORDER',selectedProduct)
    },
    CREATE_ORDER(context, payload){
      return axios.post(API_ROUTES.CREATE_ORDER, {
        productId: payload.product.id,
        count: parseInt(payload.count)
      })
          .then((response) => {
           context.state.orders.push(response.data)
          })
    },
    DELETE_FROM_ORDER(context, payload) {
      return axios.post(API_ROUTES.DELETE_ORDER + payload.id)
          .then(() => {
            context.commit('REMOVE_FROM_ORDER',payload.id)
          })
    }
  },
  getters: {
    PRODUCTS(state) {
      return state.products;
    },
    ORDER(state){
      return state.order;
    },
    ORDERS(state){
      return state.orders
    },
    STATUSES(state){
      return state.statuses
    }
  },
  modules: {
  }
})

export default store
