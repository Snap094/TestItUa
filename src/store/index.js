import Vue from 'vue'
import Vuex from 'vuex'
import {API_ROUTES} from "../routes";
import axios from "axios";

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    products: [],
    orders: [],
    statuses: [],
    order: []
  },
  mutations: {
    SET_PRODUCTS_TO_STATE: (state, products) => {
      state.products = products;
    },
    SET_ORDERS_TO_STATE: (state, orders) => {
      state.orders = orders
    },
    SET_ORDER: (state, selectedProduct) => {
      if (state.order.length) {
        let isProductExist = false;
        state.order.map(function (item) {
          if (item.id === selectedProduct.id) {
            isProductExist = true;
          }
        })
        if (!isProductExist){
          state.order.push(selectedProduct)
        }
      } else {
        state.order.push(selectedProduct)
      }
    },
    SET_STATUSES_TO_STATE: (state, statuses) =>{
      state.statuses = statuses
    },
    REMOVE_FROM_ORDER: (state, index) => {
      state.orders.splice(index, 1)
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
    CREATE_ORDER(context, payload){
      return axios.post(API_ROUTES.CREATE_ORDER, {
        productId: payload.product.id,
        count: parseInt(payload.count)
      })
          .then((response) => {
        console.log(response)
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
    DELETE_FROM_ORDER(context, payload) {
      return axios.post('https://webtest.it.ua/testApp/api/orders/delete/{id}', {
        id: payload.order.id
      })
          .then((context) => {
            context.commit('REMOVE_FROM_ORDER',payload.id)
            return payload.id
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
