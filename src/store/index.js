import Vue from 'vue'
import Vuex from 'vuex'
import {API_ROUTES} from "../routes";
import axios from "axios";

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    products: [],
    order: []
  },
  mutations: {
    SET_PRODUCTS_TO_STATE: (state, products) => {
      state.products = products;
    },
    SET_ORDER: (state, selectedProduct) => {
      if (state.order.length) {
        let isProductExist = false;
        state.order.map(function (item) {
          if (item.id === selectedProduct.id) {
            isProductExist = true;
            item.quantity++
          }
        })
        if (!isProductExist){
          state.order.push(selectedProduct)
        }
      } else {
        state.order.push(selectedProduct)
      }
    },
    REMOVE_FROM_ORDER: (state, index) => {
      state.order.splice(index, 1)
    }
  },
  actions: {
    GET_PRODUCTS_FROM_API({commit}) {
      return axios(API_ROUTES.GET_PRODUCTS, {
        method: "GET"
      })
          .then((products) => {
            commit('SET_PRODUCTS_TO_STATE', products.data);
            return products;
          })
          .catch((error) => {
            console.log(error)
            return error
          })
    },
    ADD_TO_ORDER({commit}, selectedProduct) {
      commit('SET_ORDER',selectedProduct)
    },
    DELETE_FROM_ORDER({commit}, index) {
      commit('REMOVE_FROM_ORDER', index)
    }
  },
  getters: {
    PRODUCTS(state) {
      return state.products;
    },
    ORDER(state){
      return state.order;
    }
  },
  modules: {
  }
})

export default store
