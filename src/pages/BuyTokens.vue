<template>
    <div class="d-flex justify-content-center align-items-center" style="flex-shrink: 0;">
        <div class="w-100 mx-5" style="max-width: 600px;">
            <h1 class="text-center mb-4">Buy Tokens</h1>
            <div class="row">
                <div class="col-md-6">
                    <div class="card mb-3 mx-auto">
                        <div class="card-body">
                            <h5 class="card-title">100 Tokens</h5>
                            <p class="card-text">Price: €10</p>
                            <button class="btn btn-primary" @click="buyTokens(100)">Buy</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card mb-3 mx-auto">
                        <div class="card-body">
                            <h5 class="card-title">500 Tokens</h5>
                            <p class="card-text">Price: €50</p>
                            <button class="btn btn-primary" @click="buyTokens(500)">Buy</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card mb-3 mx-auto">
                        <div class="card-body">
                            <h5 class="card-title">1000 Tokens</h5>
                            <p class="card-text">Price: €90</p>
                            <button class="btn btn-primary" @click="buyTokens(1000)">Buy</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-5">
                    <div class="card mb-3 mx-auto">
                        <div class="card-body">
                            <h5 class="card-title">5000 Tokens</h5>
                            <p class="card-text">Price: €400</p>
                            <button class="btn btn-primary" @click="buyTokens(5000)">Buy</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                        <h5 class="card-title">Payment Details</h5>
                        </div>
                        <div class="card-body">
                        <form class="form-inline">
                            <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control ml-2" id="name" placeholder="Name of the card holder"
                                v-model="name">
                            </div>
                            <div class="form-group">
                            <label for="surname">Surname</label>
                            <input type="text" class="form-control ml-2" id="surname" placeholder="Surname of the card holder"
                                v-model="surname">
                            </div>
                            <div class="form-group">
                            <label for="card-number">Card Number</label>
                            <input type="tel" class="form-control ml-2" id="card-number" maxlength="16"
                                placeholder="Enter card number" v-model="cardNumber">
                            </div>
                            <div class="row">
                            <div class="form-group col-md-8">
                                <label for="expiration-date" class="mr-2">Expiration Date</label>
                                <input type="text" class="form-control" id="expiration-date" placeholder="MM/YY"
                                v-model="expirationDate" maxlength="5">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="cvv" class="mr-2">CVV</label>
                                <input type="number" class="form-control" id="cvv" placeholder="Enter CVV" v-model="cvv"
                                onkeypress="if (this.value.length > 2) return false;" min="100" max="999">
                            </div>
                            </div>
     
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sweetalert from "sweetalert"
export default {
    data() {
        return {
            name: "",
            surname: "",
            cardNumber: "",
            expirationDate: "",
            cvv: "",
        }
    },
    methods: {
        validateCheckout() {
            if (this.name && this.surname && this.cardNumber && this.expirationDate && this.cvv) {
                return true
            } else {
                sweetAlert("Attention", "Please fill all the fields", "error");
                return false
            }
        },
        buyTokens(amount) {
            if(this.validateCheckout()){
                this.$store
                    .dispatch('user/addTokens', amount)
                    .catch((err) => {
                        sweetalert({
                            text: "Something went wrong.",
                            icon: "error"
                        })
                        console.error(err);
                    });
                sweetalert({
                text: "Congrats, new tokens for you!",
                icon: "success"
                })
            }
        },
    },
};
</script>

<style scoped></style>