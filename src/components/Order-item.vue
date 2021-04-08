<template>
    <div class="order-item">
            <div class="table-crud">
                <div class="table-crud__img">
                    <img :src="product.photoUrl" alt="">
                </div>
                <div class="table-crud__right">
                    <div class="table-crud__right-upper">
                        <p>{{product.name}}</p>
                            <p
                            >{{status.name}}</p>
                    </div>
                    <div class="lower"
                    >
                        <div class="lower__price">
                            <div class="lower__price-item">
                                <p>Цена</p>
                                <p>$ {{ product.price }}</p>
                            </div>
                            <div class="lower__price-item">
                                <p>Количество</p>
                                <p>{{ order_item_data.count }}</p>
                            </div>
                            <div class="lower__price-item">
                                <p>Сумма</p>
                                <p>$ {{product.price * order_item_data.count}}</p>
                            </div>
                        </div>
                        <div class="lower__changes">
                            <div class="lower__changes-redact">
                                <button>Изменить</button>
                            </div>
                            <div class="lower__changes-delete">
                                <button @click="deleteOrder">Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Order-item",
        props: {
            order_item_data: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                'ORDERS',
                'STATUSES'
            ]),
            status(){
                return this.STATUSES.find((status) => {
                    return status.id === this.order_item_data.statusId
                })
            },
            product(){
                return this.PRODUCTS.find((product) => {
                    return product.id === this.order_item_data.productId
                })
            }
        },
        methods: {
            ...mapActions([
                'GET_ORDERS_FROM_API',
                'GET_PRODUCTS_FROM_API',
                'GET_STATUSES_FROM_API',
                "DELETE_FROM_ORDER"
            ]),
            deleteOrder() {
                this.DELETE_FROM_ORDER({
                    id: this.order_item_data.id
                })
            },
        },
        mounted() {
        }
    }
</script>

<style>
    .order-item {
        display: flex;
    }
</style>