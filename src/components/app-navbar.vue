<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <template v-if="profile.token">
                    <li>
                        <a href="javascript:;"><i class="iconfont icon-user"></i>{{ profile.nickname }}</a>
                    </li>
                    <li><a href="javascript:;" @click="logout()">退出登录</a></li>
                </template>
                <template v-else>
                    <li><router-link to="/login">请先登录</router-link></li>
                    <li><a href="javascript:;">免费注册</a></li>
                </template>
                <li>
                    <a href="javascript:;" @click="toMyOrder">我的订单</a>
                </li>
                <li><a href="javascript:;">会员中心</a></li>
                <li><a href="javascript:;">帮助中心</a></li>
                <li><a href="javascript:;">关于我们</a></li>
                <li>
                    <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
export default {
    name: "AppTopnav",
    setup() {
        // 获取用户的登陆信息 才能 控制切换导航菜单
        const store = useStore()
        const router = useRouter()
        // 使用vuex中的state设置计算属性
        const profile = computed(() => {
            return store.state.user.profile
        })
        // 退出登录
        const logout = () => {
            store.commit('user/setUser', {})
            // 清空购物车
            store.commit('cart/setCartList',[])
            router.push('/login')
        }
        // 进入购物车
        const toMyOrder = () => {
            if(store.state.user.profile.token){
                // 登陆
                router.push('/member/order')
            } else {
                // 未登陆
                router.push('/login')
            }
        }
        return { profile, logout,toMyOrder }
    }

};
</script>
<style scoped lang="less">
.app-topnav {
    background: #333;

    ul {
        display: flex;
        height: 53px;
        justify-content: flex-end;
        align-items: center;

        li {
            a {
                padding: 0 15px;
                color: #cdcdcd;
                line-height: 1;
                display: inline-block;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                &:hover {
                    color: @xtxColor;
                }
            }

            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    }
}
</style>