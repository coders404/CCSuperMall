<template>
    <div class="check-button">
        <div class="item" :class="{action:isChecked}" ></div>
    </div>
</template>
<script>
export default {
    name:'CheckButton',
    props:{
        isChecked:{
            type:Boolean,
            default(){
                return false
            }
        }
    },
    methods:{
        checkClick(){
            this.changeCheck=!this.changeCheck;
            this.$emit("checkClick");
        }
    }
}
</script>
<style scoped>
.check{
    display: inline-block;
    width: 40px;
    height: 100%;
}
.item{
    border: 1px solid #aaa;
    width: 20px;
    height: 20px;
    border-radius: 50%;
}
.action{
     border: 1px solid #fff;
    background-color: var(--color-tint);
    background-image: url("~assets/img/cart/tick.svg");
    background-size: 100%;
}
</style>