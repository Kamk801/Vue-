<template>
    <div class="gologin">
        <img src="@/assets/bgc.jpeg" alt="" class="bgimg">
        <div class="content" v-if="!erwei">
            <p class="login">登录</p>
            <div class="span">
                <h1>手机</h1>
                <div class="contant">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shouji"></use>
                    </svg>
                    <input type="text" placeholder="请输入手机号码" v-model="phone">
                </div>
            </div>
            <div class="span" v-if="!otherway">
                <h1>密码</h1>
                <div class="contant">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-mima"></use>
                    </svg>
                    <input type="text" placeholder="请输入密码" v-model="mima">
                </div>
                <span @click="change('yanzhen')" class="loginway">验证码登录</span>
            </div>
            <div class="span" v-else>
                <h1>验证码</h1>
                <div class="contant">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yanzhengma"></use>
                    </svg>
                    <input type="text" placeholder="输入验证码" v-model="captcha">
                    <button class="yanzheng" @click="getCaptcha">获取验证码</button>
                </div>
                <span @click="change('mima')" class="loginway" :disabled="isdisabled">密码登录</span>
            </div>
            <button @click="goLogin">登录</button>
            <p class="denglu" @click="changeWay">二维码登录</p>
        </div>
        <div class="content" v-else>
            <img :src="erweiImg" alt="">
            <p class="denglu" @click="changeWay">手机登录</p>
        </div>
    </div>
</template>

<script>
import { getCapcha, getKey, getErweiImg, getErweiState, getDetail } from '@/api'
export default {
    name: 'Login',
    data() {
        return {
            phone: '',
            mima: '',
            otherway: false,
            captcha: '',  //验证码
            isdisabled: "false",  //发送验证码button
            type: 'mima',  //切换验证码 密码状态
            erwei: false,  //切换 手机 二维码状态
            erweiImg: '',   //二维码图片
            erweiUrl: '',  //
            qrCheckData: {},//状态
        }
    },
    mounted() {
        this.getErwei()
    },
    methods: {
        change(value) {
            this.type = value;
            this.otherway = !this.otherway
        },
        async goLogin() {
            //两种方式  密码  验证码
            let phone = this.phone;
            let captcha = this.captcha;
            let password = this.mima;
            if (this.type == 'yanzhen') {
                if (phone != '' && captcha != '' && phone.indexOf(' ') == -1 && captcha.indexOf(' ') == -1) {
                    try {
                        //验证方式
                        await this.$store.dispatch('login/reqLogin', { phone, captcha });
                        this.$store.dispatch('login/reqUser');
                        this.$router.push('/user')
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    alert('不能为空')
                }
            } else {
                if (phone != '' && password != '' && phone.indexOf(' ') == -1 && password.indexOf(' ') == -1) {
                    try {
                        //验证方式
                        await this.$store.dispatch('login/reqMimaLogin', { phone, password });
                        this.$router.push('/user')
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    alert('不能为空')
                }
            }

        },
        getCaptcha() {
            //验证码获取
            let phone = this.phone;
            if (phone != '' && phone.indexOf(' ') == -1) {
                this.isdisabled = true;
                getCapcha(phone).then(res => {
                    alert('已发送')
                })
                setTimeout(() => {
                    this.isdisabled = false;
                }, 10000);
            }

        },
        changeWay() {
            this.erwei = !this.erwei
        },
        getErwei() {
            //获取二维码
            getKey().then(res => {
                if (res.status == 200) {
                    let key = res.data.data.unikey
                    getErweiImg(key).then(result => {
                        if (result.status == 200) {
                            this.erweiImg = result.data.data.qrimg;
                            this.erweiUrl = result.data.data.qrurl;
                            let get = setInterval(() => {
                                getErweiState(key).then(stateRes => {
                                    console.log(stateRes.data);
                                    if (stateRes.data.code == 803) {
                                        clearInterval(get);
                                        localStorage.setItem('cookie', stateRes.data.cookie);
                                        this.$store.commit('login/getCokkie', stateRes.data.cookie)
                                        this.$store.commit('login/login')
                                        this.$router.push('/user')
                                    } else if (stateRes.data.code == 800) {
                                        getErweiImg(key).then(fu => {
                                            this.erweiImg = fu.data.data.qrimg;
                                            this.erweiUrl = fu.data.data.qrurl;
                                        })
                                    }
                                })
                            }, 1000);
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="less">
.gologin {
    position: fixed;
    width: 100%;
    height: 100%;

    .bgimg {
        width: 100%;
        height: 70%;
        z-index: -1;
        position: fixed;
        top: 0;
    }

    .content {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 70%;
        display: flex;
        flex-direction: column;
        border-radius: .8rem .8rem 0 0;
        background-color: white;
        padding: .6rem;

        .login {
            font-size: .8rem;
            font-weight: 600;
            margin-bottom: .4rem;
        }

        .span {
            width: 100%;
            height: 2rem;
            margin-bottom: .2rem;

            h1 {
                font-size: .32rem;
                font-weight: normal;
                margin: 0;
            }

            .contant {
                display: flex;
                align-items: center;
                border-bottom: 1px solid #999;
                margin-bottom: .1rem;

                .icon {
                    width: .6rem;
                    height: .6rem;
                }

                input {
                    border: none;
                    width: 70%;
                    height: .6rem;
                    margin: .2rem;
                    font-size: .32rem;
                    padding-left: .2rem;
                }

                .yanzheng {
                    float: right;
                    height: .6rem;
                    width: 30%;
                    color: white;
                    line-height: .6rem;
                    text-align: center;
                    border: none;
                    font-size: .28rem;
                    border-radius: .4rem;
                    background-color: orange;
                    transform: translateY(-50%);
                }
            }

            .loginway {
                color: orange;
                float: right;
                font-size: .28rem;
            }
        }

        button {
            width: 90%;
            color: white;
            font-weight: 600;
            height: 1rem;
            background-color: rgb(252, 122, 75);
            border-radius: .6rem;
            border: none;
            font-size: .4rem;
            margin: .6rem auto 0;
        }

        .denglu {
            margin: .4rem auto 0;
            text-align: center;
            width: 40%;
            color: #999;
            border-bottom: 1px solid #999;
            font-size: .32rem;
        }
    }
}
</style>
