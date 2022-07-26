<template>
<!--使用fontColor指定字体颜色-->
<div class="tab-bar-item" @click="toRedirect">
<div v-if="!getIsActive"><slot name="item-icon"></slot></div>
<div v-else><slot name="item-icon-action"></slot></div>
<div :style="getStyle"><slot name="item-text"></slot></div>
</div>
</template>

<script>
export default {
    name: "TabBarItem",
    props:{
        path:String,
        fontColor:{
            type:String,
            default:'red'
        }
    },
    methods:{
        toRedirect(){
            this.$router.replace(this.path);
        }
    },
    computed:{
        getIsActive(){
        //    this.$route.path.indexOf(this.path);当前活跃路由返回0
           return this.$route.path.indexOf(this.path)==0//当前活跃时return true
        },
        getStyle(){
            return this.getIsActive?{color:this.fontColor}:{};
        }
    }
}
</script>
<style scoped>
.tab-bar-item{
   flex: 1;
   height: 49px;
   text-align: center;

 }
 .tab-bar-item img{
     width: 24px;
     height: 24px;
     margin-top: 3px;
     vertical-align: middle;
 }

</style>