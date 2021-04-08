<template>
            <div class="table-crud create"
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
                            >
                                {{ product.name }}
                            </option>
                        </select>

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
                                <input type="number"
                                       min="1"
                                       v-model="count"
                                >
                            </div>
                            <div class="lower__price-item">
                                <p>Сумма</p>
                                <p>$ {{ selectedProduct.price * count}}</p>
                            </div>
                        </div>
                        <div class="lower__changes">
                            <div class="table-crud__right-upper-btn-create">
                                <button @click="addOrder">Добавить</button>
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
                count: 1
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
            this.selectedProduct = this.products[0]
        },
        watch: {},
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_ORDER',
                'CREATE_ORDER'
            ]),
            look() {
                console.log(this.selectedProduct)
            },
            addOrder() {
                this.CREATE_ORDER({
                    product: this.selectedProduct,
                    count: this.count
                })
                .then(() => {
                    this.$emit('addOrder');
                    this.hideTable = false
                })
            }
        }
    }
</script>

<style lang="scss">

    .table-crud {
        width: 70%;
        max-width: 850px;
        display: flex;
        background-color: #f7f7f7;
        box-shadow: 0 0 8px #7bd4ab;
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
                    background-color: #dedddd;
                    box-shadow: 0 0 3px #31a2ce;
                    border-radius: 7px;
                    margin-right: 10px;
                }
            }
        }
    }
  .table-crud__right-upper-btn{
      width: 180px;
      height: 40px;
      button {
          height: 100%;
          width: 100%;
          padding: 10px 10px;
          background-color: #dedddd;
          border: 1px solid black;
          cursor: pointer;
          border: 0;
          border-radius: 7px;
          transition: 0.5s;
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
                p:nth-child(1){
                    margin-right: 20px;
                }
                input {
                    text-align: start;
                    width: 45px;
                    padding: 0 10px;
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
                background-color: #dedddd;
                border: 1px solid black;
                box-shadow: 0 0 2px #31a2ce;
                cursor: pointer;
                transition: 0.5s;
                border-radius: 7px;
                &:hover {
                    background-color: #31a2ce;
                    color: #f7f7f7;
                }
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
    .create{
        box-shadow: 0 0 8px #31a2ce;
    }
</style>