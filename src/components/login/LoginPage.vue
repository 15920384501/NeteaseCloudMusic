<template>
   <div class="login-wrapper">
        <div class="login-top">
            <div class="login-icon">
                <img src="../../assets/loginIcon.png" alt="">
            </div>
        </div>
       <div class="login-bottom">
            <div class="login-btn" @click="$router.push({name:'PhoneLogin'})">
                手机号登录
            </div>
       </div>
       <router-view></router-view>
   </div>

</template>

<script>
    export default {
        name: "LoginPage"
    }
</script>

<style lang="scss" scoped>

.login-wrapper{
    width : 100vw ;
    height : 100vh ;
    background-color : rgb(201,61,45) ;
    position : fixed;
    z-index: 51;


    /*------------上半部样式------------------*/
    .login-top{
        width  : 100% ;
        height : 60%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    /*上半部图标框样式*/
    .login-icon{
        width : 20vw ;
        height : 20vw ;
        background-color : rgb(222,64,51) ;
        border-radius: 50% ;
        display: flex ;
        justify-content: center;
        align-items: center;

       img{
           height : 70% ;
           width : 70% ;
       }
    }

    .login-bottom{
        .login-btn{
            width : 280px ;
            height : 40px ;
            line-height : 40px ;
            text-align : center ;
            margin : 50px auto ;
            background-color : #fff;
            border-radius: 20px ;
            color  : rgb(235,77,68) ;
            font-weight :bold;

        }
    }
}
</style>