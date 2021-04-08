<template>
    <div class="crud">
        <div class="add_order_btn">
            <button @click="addTable">Добавить заказ</button>
        </div>
        <Table
                :products="PRODUCTS"
                @addOrder="addOrder"
                v-if="order"
        />
        <Order
                :orders="ORDERS"
                :products="PRODUCTS"
        />
    </div>
</template>
<!--v-if="ORDER.length"-->
<!--:order_data="ORDER"-->
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
                // orders: []
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                'ORDERS',
                'STATUSES'
            ])
        },
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'GET_ORDERS_FROM_API',
                'GET_STATUSES_FROM_API'
            ]),
            addOrder() {
                this.order = false;
            },
            addTable() {
                this.order = true;
                window.scrollTo(0,0)
            }
        },
        mounted() {
            // this.fetchProducts()
            this.GET_STATUSES_FROM_API()
            this.GET_ORDERS_FROM_API();
            this.GET_PRODUCTS_FROM_API()
            .then((response) => {
                if (response.data) {
                    console.log('data arrived')
                }
            })
        }
    }
</script>

<style lang="scss">
    .crud{
        max-width: 1300px;
        margin: 0 auto;
        padding: 30px 50px;
        box-shadow: 0 0 8px #e0e0e0;
    }
    .add_order_btn{
        position: fixed;
        right: 10%;
        top: 50%;
        transform: translateY(-50%);
        button{
            font-size: 18px;
            font-weight: 600;
            border-radius: 7%;
            width: 150px;
            height: 100px;
            box-shadow: 0 0 8px #31a2ce;
            transition: 1s;
            &:hover{
                background-color: #31a2ce;
                color: #f7f7f7;
                cursor: pointer;
            }
        }

    }

</style>