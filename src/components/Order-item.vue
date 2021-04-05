<template>
    <div class="order-item">
        <div class="table-crud">
            <div class="table-crud__img">
                <img :src="order_item_data.photoUrl" alt="">
            </div>
            <div class="table-crud__right">
                <div class="table-crud__right-upper">
                    <p>{{order_item_data.name}}</p>
                </div>
                <div class="lower"
                >
                    <div class="lower__price">
                        <div class="lower__price-item" >
                            <p>Цена</p>
                            <p>$ {{ order_item_data.price }}</p>
                        </div>
                        <div class="lower__price-item">
                            <p>Количество</p>
                            <p>{{ order_item_data.quantity }}</p>
                        </div>
                        <div class="lower__price-item">
                            <p>Сумма</p>
                            <p>$ {{order_item_data.price * order_item_data.quantity}}</p>
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
        methods: {
            deleteOrder() {
                this.$emit('deleteOrder')
            }
        },
        mounted() {
            // this.$set(this.order_item_data, 'quantity', 1)
        }
    }
</script>

<style>
.order-item{
    display: flex;
}
</style>