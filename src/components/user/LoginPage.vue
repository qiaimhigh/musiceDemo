<template>
  <div id="login">
    <div class="box">
      <h1>欢迎登陆</h1>
      <img src="../../../public/img/disc_default.png" alt="" />
      <div class="body_box">
        <input type="text" placeholder="请输入手机号" v-model="phone" />
        <input
          v-show="isPas"
          type="text"
          placeholder="请输入密码"
          v-model="pas"
        />
        <div v-show="!isPas" class="email">
          <input type="text" placeholder="请输入短信验证码" v-model="captcha" />
          <button @click="captchaBtn">发送验证码</button>
        </div>
        <button @click="sendInf">登录</button>
      </div>
      <div class="bottom">
        <span to="/login" @click="changeEmail">短信登陆 </span>
        <span>|</span>
        <router-link to="/login"> 扫码登录</router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getCaptcha } from "@/axios/user";
let pas = ref("");
let phone = ref("");
let isPas = ref("true");
let captcha = ref(0);
let router = useRouter();
function changeEmail() {
  isPas.value = false;
}
let store = useStore();
async function sendInf() {
  if (isPas.value) {
    if (phone.value !== "" && pas.value !== "") {
      let res = await store.dispatch("getLogin", {
        phone: phone.value,
        password: pas.value,
      });
      console.log(res);
      if (res.data.code === 200) {
        store.commit('updateToken',res.data.token)
        localStorage.setItem('token',res.data.token)
        router.push("/");
      }else{
        alert('账号密码错误')
      }
    }else{
        alert('请输入账号和密码')
    }
  } else {
    let res = await store.dispatch("verifyCaptchaS", {
      phone: phone.value,
      captcha: captcha.value,
    });
    console.log(res);
  }
}
async function captchaBtn() {
  console.log("发送验证码");
  if (phone.value !== "") { 
    let res = await getCaptcha(phone.value);
    console.log(res);
  } else {
    alert('请输入手机号码')
  }
}
</script>
<style lang="less">
#login {
  .box {
    background-color: rgb(255, 123, 108);
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 1rem;
    img {
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      margin: 0.4rem;
    }

    .body_box {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 6rem;
      justify-content: space-around;
      width: 100%;
      input {
        height: 1rem;
        width: 70%;
        background-color: transparent;
        text-align: center;
        border: none;
        border-bottom: 2px solid #cfcfcf;
      }
      ::-webkit-input-placeholder {
        font-size: 0.32rem;
        color: white;
        font-weight: 600;
      }
      button {
        width: 2rem;
        height: 0.8rem;
        border: 2px solid #cfcfcf;
        border-radius: 0.6rem;
        background-color: #f12b2b;
        color: white;
      }
      .email {
        display: flex;
        button {
          border-radius: 0;
          height: 100%;
          margin: 0 0.2rem;
        }
      }
    }
    .bottom {
      color: white;
      font-size: 0.32rem;
      a {
        color: white;
        font-size: 0.32rem;
      }
    }
  }
}
</style>
