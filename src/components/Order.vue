<template>
    <div class="order">
        <h1>Список заказов</h1>
        <p class="order_paragraph">Всего - {{orders.length}}</p>
        <OrderItem
                v-for="(order) in paginationOrders"
                :key="order.id"
                :order_item_data="order"
                :products="PRODUCTS"
                :statuses="STATUSES"
                @deleteOrder="deleteOrder"
        />
        <div class="order_pagination">
            <div
                    class="page"
                    v-for="page in pages"
                    :key="page"
                    :class="{'page_active': page === pageNumber}"
                    @click="pageClick(page)"
            ><p>{{page}}</p></div>
        </div>
    </div>
</template>

<script>
    import OrderItem from "./Order-item";
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "order",
        components: {OrderItem},
        props: {
            orders: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data () {
            return {
                ordersPerPage: 10,
                pageNumber: 1
            }
        },
        methods: {
            ...mapActions([
                'DELETE_FROM_ORDER',
                'GET_ORDERS_FROM_API',
                'GET_STATUSES_FROM_API'
            ]),
            deleteOrder() {
                this.DELETE_FROM_ORDER()
            },
            pageClick(page) {
                this.pageNumber = page
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                'ORDERS',
                'STATUSES'
            ]),
            pages(){
                return Math.ceil(this.orders.length / 10)
            },
            paginationOrders() {
                let from = (this.pageNumber - 1) * this.ordersPerPage;
                let to = from + this.ordersPerPage;
                return this.orders.slice(from,to)
            }
        }
    }

</script>

<style lang="scss">
    .order{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .order_paragraph{
        font-size: 24px;
        font-weight: 400;
    }
    .order_pagination{
        max-width: 800px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .page{
        border: 1px solid #42b983;
        padding: 8px;
        margin-right: 5px;
        margin-top: 3px;
        p{
            margin: 0;
        }
    }
    .page:hover{
        background-color: #42b983;
        color: #f7f7f7;
        cursor: pointer;
    }
    .page_active{
        background-color: #42b983;
        color: #f7f7f7;
    }
</style>