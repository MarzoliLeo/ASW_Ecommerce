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
                <div class="col-md-6">
                    <div class="card mb-3 mx-auto">
                        <div class="card-body">
                            <h5 class="card-title">5000 Tokens</h5>
                            <p class="card-text">Price: €400</p>
                            <button class="btn btn-primary" @click="buyTokens(5000)">Buy</button>
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
    methods: {
        buyTokens(amount) {
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
        },
    },
};
</script>

<style scoped></style>