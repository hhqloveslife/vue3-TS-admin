<template>
  <div class="nav-menu">
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="props.collapse"
      :default-active="defaultValue"
    >
      <div class="logo">
        <img class="img" src="@/assets/img/logo.svg" alt="logo" />
        <span v-if="!collapse" class="title">Vue+TS</span>
      </div>
      <template v-for="item in userMenus" :key="item.id + ''"
        ><!-- 这里绑定的key接收的是字符串，所以要将id转成string（常用做法是+ ‘’）-->
        <el-sub-menu
          :index="item.id + ''"
          class="submenu"
          v-if="item.name !== '随便聊聊'"
          ><!--这里bind一个index，让每个菜单可以单独展开关闭，因为这个菜单的展开关闭是根据index，如果index相同，就一起展开 -->
          <template #title>
            <el-icon size="20">
              <component :is="icons[item.id]" style="color: #123456">
              </component>
            </el-icon>
            <span class="name">{{ item.name }}</span>
          </template>
          <template v-for="sub in item.children" :key="sub.id + ''">
            <el-menu-item
              :index="sub.id + ''"
              @click="handleMenuItemClick(sub)"
              >{{ sub.name }}</el-menu-item
            >
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, reactive, markRaw, ref } from 'vue'
import { useStore } from 'vuex'
import { Monitor, Setting, Goods, ChatLineRound } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'

const props = defineProps(['collapse'])
const store = useStore()
const router = useRouter()
const route = useRoute()
const userMenus = computed(() => store.state.login.userMenus)
//这种取icon的方式，我自己都看笑了hhh，不过没办法，elementplus改版了，后端数据没更新
const icons: any = reactive({
  38: markRaw(Monitor),
  1: markRaw(Setting),
  9: markRaw(Goods),
  41: markRaw(ChatLineRound)
})

const currentPath = route.path
const menu = pathMapToMenu(userMenus.value, currentPath)
const defaultValue = ref(menu.id + '')

const handleMenuItemClick = (item: any) => {
  router.push({
    path: item.url ?? '/notfound'
  })
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.nav-menu {
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
}
.el-menu-vertical-demo {
  height: 100%;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.logo .img {
  height: 100%;
  margin: 0 20px 0 8px;
}
.logo .title {
  font-size: 16px;
  font-weight: 700;
}
.name {
  margin-left: 20px;
}
</style>
