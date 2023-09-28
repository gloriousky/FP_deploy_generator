<template>
  <div class="ml-4 mt-0.5 border-l pl-3">
    <template v-for="(item, idx) in items" :key="`item-${idx}`">
      <template v-if="item.items?.length > 0">
        <a
          href="#"
          class="aside__group__list__item group"
          @click.prevent="switchOpenGroup(item.code)"
        >
          <div class="flex items-center justify-center">
            <span class="ml-1 group-hover:text-blue-400">
              {{ item.code }}
            </span>
          </div>

          <div
            :class="[
              'transform transition-transform duration-75',
              opens.includes(item.code) && 'rotate-180',
            ]"
          >
            <i class="fas fa-angle-down aside__group__list__icon text-xs"></i>
          </div>
        </a>
        <transition
          name="fade"
          enter-active-class="animate__animated animate__flipInX animate__faster"
        >
          <the-aside-items
            v-show="opens.includes(item.code)"
            :items="item.items"
            :opens="opens"
          />
        </transition>
      </template>
      <router-link v-else :to="item.path" v-slot="{ href, isActive }" custom>
        <a
          :href="href"
          class="aside__group__list__item group"
          :class="{ 'aside__group__list__item--active': isActive }"
          @click="onLinkClick"
        >
          <div class="flex items-center justify-center">
            <span class="pl-1 group-hover:text-blue-400">
              {{ item.code }}
            </span>
          </div>
        </a>
      </router-link>
    </template>
  </div>
</template>
<script setup>
import { inject } from "vue";
defineProps({
  items: Array,
  opens: Array,
});
const onLinkClick = inject("onLinkClick");
const switchOpenGroup = inject("switchOpenGroup");
</script>
