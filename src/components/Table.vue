<template>
            <div class="table-crud"
            v-if="hideTable"
            >
                <div class="table-crud__img"
                     v-if="selectedProduct">
                    <img :src="selectedProduct.photoUrl" alt="">
                </div>
                <div class="table-crud__right">
                    <div class="table-crud__right-upper">
                        <select
                                v-model="selectedProduct"
                                @change="look()">
                            <option
                                    v-for="product in products"
                                    :value="product"
                                    :key="product.id"
                                    :selected="product === 'iPhone 11 Pro Max'"
                            >
                                {{ product.name }}
                            </option>
                        </select>
<!--                        <span>{{selectedProduct}}</span>-->
                        <div class="table-crud__right-upper-btn">
                            <button @click="addOrder">Подтвержден</button>
                        </div>
                    </div>
                    <div class="lower"
                    >
                        <div class="lower__price" v-if="selectedProduct">
                            <div class="lower__price-item" >
                                <p>Цена</p>
                                <p>$ {{ selectedProduct.price }}</p>
                            </div>
                            <div class="lower__price-item">
                                <p>Количество</p>
                                <input type="text"
                                       value=""
                                       v-model="selectedProduct.quantity"
                                >
                            </div>
                            <div class="lower__price-item">
                                <p>Сумма</p>
                                <p>$ {{ selectedProduct.price }}</p>
                            </div>
                        </div>
                        <div class="lower__changes">
                            <div class="lower__changes-redact">
                                <button>Изменить</button>
                            </div>
                            <div class="lower__changes-delete">
                                <button>Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Table",
        props: {
            products: Array,
        },
        data() {
            return {
                product: {
                    id: null,
                    price: null,
                    photoUrl: null,
                    name: null,
                },
                selectedProduct: {},
                hideTable: true,

            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                'ORDER'
            ])
        },
        mounted() {
            this.$emit('component-loaded', this.selectedProduct);
            this.$set(this.selectedProduct, 'quantity', 1)
        },
        watch: {},
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_ORDER'
            ]),
            look() {
                console.log(this.selectedProduct)
            },
            addOrder() {
                this.$emit('addOrder', this.selectedProduct);
                this.hideTable = false

            }
        }
    }
</script>

<style lang="scss">
    .table-crud {
        width: 70%;
        display: flex;
        background-color: #f7f7f7;
        box-shadow: 0 0 8px #e0e0e0;
        height: 250px;
        padding: 25px;
        border-radius: 15px;
        margin-bottom: 20px;

        p {
            white-space: nowrap;
        }

        &__img {
            width: 30%;
            height: 100%;

            img {
                height: 100%;
                width: 100%;
                object-fit: contain;
            }
        }

        &__right {
            display: flex;
            flex-direction: column;
            width: 70%;

            &-upper {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 20px;

                select {
                    width: 180px;
                    padding: 10px 10px;
                    background-color: #c1c1c1;
                    border-radius: 7px;
                    margin-right: 10px;
                }

                &-btn {
                    width: 150px;

                    button {
                        height: 100%;
                        width: 100%;
                        padding: 10px 10px;
                        background-color: #c1c1c1;
                        cursor: pointer;
                        border: 0;
                        border-radius: 7px;
                        transition: 0.5s;
                    }

                    :hover {
                        background-color: #8D8D8D;
                    }
                }
            }
        }
    }

    .lower {
        display: flex;
        padding: 20px;
        align-items: flex-end;

        &__price {
            display: flex;
            flex-wrap: wrap;
            width: 50%;

            &-item {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;

                p {
                    text-align: start;
                    width: 90px;
                }
                input {
                    text-align: start;
                    width: 90px;
                    height: 20px;
                }
            }

        }

        &__changes {
            display: flex;
            width: 50%;
            height: 100%;
            justify-content: flex-end;
            align-items: flex-end;

            button {
                width: 100%;
                padding: 10px 10px;
                background-color: #c1c1c1;
                cursor: pointer;
                border: 0;
                transition: 0.5s;
                border-radius: 7px;

            }

            :hover {
                background-color: #8D8D8D;
            }

            &-redact {
                width: 150px;
                border-radius: 7px;
            }

            &-delete {
                margin-left: 10px;
                width: 150px;
                border-radius: 7px;
            }
        }
    }
</style>