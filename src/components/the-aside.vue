<template>
  <aside class="aside">
    <div class="aside__bg"></div>
    <div ref="asideScrollRef" class="aside__inner">
      <div
        v-for="(item, idx) in nav.items"
        :key="`item--${idx}`"
        class="aside__group"
      >
        <h5 v-if="item.title" class="aside__group__title">{{ item.title }}</h5>
        <ul class="aside__group__list">
          <li
            v-for="(child, childIdx) in item.items"
            :key="`item--${idx}__child--${childIdx}`"
          >
            <template v-if="child.items?.length > 0">
              <a
                href="#"
                class="aside__group__list__item group"
                @click.prevent="switchOpenGroup(child.code, true)"
              >
                <div class="flex items-center justify-center">
                  <i class="aside__group__list__icon" :class="child.icon"></i>
                  <span class="ml-4 group-hover:text-blue-400">
                    {{ child.code }}
                  </span>
                </div>

                <div
                  :class="[
                    'transform transition-transform duration-75',
                    nav.opens.includes(child.code) && 'rotate-180',
                  ]"
                >
                  <i
                    class="fas fa-angle-down aside__group__list__icon text-xs"
                  ></i>
                </div>
              </a>
              <transition
                name="fade"
                enter-active-class="animate__animated animate__flipInX animate__faster"
              >
                <the-aside-items
                  v-show="nav.opens.includes(child.code)"
                  :items="child.items"
                  :opens="nav.opens"
                />
              </transition>
            </template>
            <router-link
              v-else
              :to="child.path"
              v-slot="{ href, isActive }"
              custom
            >
              <a
                :href="href"
                class="aside__group__list__item group"
                :class="{ 'aside__group__list__item--active': isActive }"
                @click="onLinkClick"
              >
                <div class="flex items-center justify-center">
                  <i class="aside__group__list__icon" :class="child.icon"></i>
                  <span class="ml-4 group-hover:text-blue-400">
                    {{ child.code }}
                  </span>
                </div>
              </a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
<script setup>
import { ref, reactive, computed, onMounted, inject, provide } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth-store";

/** component */
import PerfectScrollbar from "perfect-scrollbar";

/** helper */
import {
  reduce,
  pluck,
  intersection,
  filter,
  includes,
  findIndex,
  equals,
  take,
} from "ramda";

/**  constants */
const navList = [
  {
    items: [
      {
        node: "SUPER",
        icon: "ti ti-dashboard",
        path: "/dashboard",
        code: "儀表板",
      },
    ],
  },
  {
    title: "主選單",
    items: [
      {
        node: "SUPER",
        icon: "ti ti-file",
        code: "文章管理",
        items: [
          {
            node: "SUPER",
            path: "/page/content",
            code: "文章內容",
          },
        ],
      },
    ],
  },
  {
    title: "其他",
    items: [
      {
        node: "SUPER",
        icon: "ti ti-box-multiple",
        code: "階層選單",
        items: [
          {
            node: "SUPER",
            path: "/",
            code: "第一層",
          },
          {
            node: "SUPER",
            code: "第一層",
            items: [
              {
                node: "SUPER",
                path: "/",
                code: "第二層",
              },
              {
                node: "SUPER",
                path: "/",
                code: "第二層",
                items: [
                  {
                    node: "SUPER",
                    path: "/",
                    code: "第三層",
                  },
                  {
                    node: "SUPER",
                    path: "/",
                    code: "第三層",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const route = useRoute();
const authStore = useAuthStore();
const asideScrollRef = ref();
const nav = reactive({
  opens: [],
  items: computed(() => {
    const permissions = [...authStore.permissions, "SUPER"];
    return reduce(
      (arr, nav) => {
        const itemCodes = pluck("node", nav.items);
        const intersect = intersection(itemCodes, permissions);
        /** 都沒有權限 */
        if (intersect.length === 0) return arr;
        /** 過濾子代 */
        const filterItems = filter(
          (item) => includes(item.node, intersect),
          nav.items,
        );
        return [...arr, { ...nav, items: filterItems }];
      },
      [],
      navList,
    );
  }),
});
const onLinkClick = inject("onLinkClick");

const switchOpenGroup = (code, reset = false) => {
  const isExist = includes(code, nav.opens);
  switch ([isExist, reset].toString()) {
    case [true, true].toString():
      nav.opens = [];
      break;

    case [true, false].toString():
      nav.opens = take(findIndex(equals(code), nav.opens), nav.opens);
      break;

    case [false, false].toString():
      nav.opens = [...nav.opens, code];
      break;

    case [false, true].toString():
      nav.opens = [code];
      break;
  }
};

provide("switchOpenGroup", switchOpenGroup);

onMounted(() => {
  new PerfectScrollbar(asideScrollRef.value);

  /** 找到 active node */
  const findOpenCode = (list, parentCodes = []) => {
    let openCodes = [];
    for (let node of list) {
      if (node.path === route.name) {
        openCodes = [...parentCodes, node.code];
        break;
      }

      if (node.items?.length > 0) {
        openCodes = findOpenCode(node.items, [...parentCodes, node.code]);
      }
    }
    return openCodes;
  };
  nav.opens = findOpenCode(navList);
});
</script>
