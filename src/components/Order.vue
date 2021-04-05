<template>
    <div class="order">
        <h1>Order</h1>
        <OrderItem
                v-for="(item, index) in order_data"
                :key="item.name"
                :order_item_data="item"
                @deleteOrder="deleteOrder(index)"
        />
    </div>
</template>

<script>
    import OrderItem from "./Order-item";
    import {mapActions} from 'vuex'
    export default {
        name: "order",
        components: {OrderItem},
        props: {
            order_data: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        methods: {
            ...mapActions([
                'DELETE_FROM_ORDER'
            ]),
            deleteOrder(index) {
                this.DELETE_FROM_ORDER(index)
            }
        }
    }

</script>

<style>

</style>