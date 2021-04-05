<template>
    <div>
        <button @click="addTable">Добавить заказ</button>
        <Table
                :products="PRODUCTS"
                @addOrder="addOrder"
                v-if="order"
        />
        <Order
                v-if="ORDER.length"
                :order_data="ORDER"
        />
    </div>
</template>

<script>

    import Table from "./Table";
    import Order from "./Order";
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Crud",
        components: {
            Table,
            Order
        },
        data() {
            return {
                // products: [],
                order: false,
                orders: []
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                'ORDER'
            ])
        },
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_ORDER'
            ]),
            addOrder(data) {
                console.log('TABLE COMPONENT LOADED');
                this.ADD_TO_ORDER(data)
                this.order = false;
            },
            addTable() {
                this.order = true;

            }
        },
        mounted() {
            // this.fetchProducts()
            this.GET_PRODUCTS_FROM_API()
            .then((response) => {
                if (response.data) {
                    console.log('data arrived')
                }
            })
        }
    }
</script>

<style scoped>

</style>