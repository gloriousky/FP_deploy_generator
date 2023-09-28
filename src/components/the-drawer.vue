<template>
  <el-drawer
    :model-value="$display"
    :size="isMobile ? '100%' : '24rem'"
    :before-close="onClose"
    show-close
  >
    <template #header>
      <h4 class="text-lg font-semibold leading-none text-black dark:text-white">
        {{ payload.title }}
      </h4>
    </template>
    <template #default>
      <div v-if="payload.text">
        {{ payload.text }}
      </div>
      <component
        v-if="payload.component"
        :is="payload.component"
        ref="compRef"
        v-bind="payload.props"
      />
    </template>
    <template #footer>
      <Button size="lg" type="primary" @click="onConfirm" full>
        {{ payload.confirmButtonText }}
      </Button>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDrawerStore } from "@/stores/drawer-store";
import { useMobile } from "@/hooks/use-mobile";

/** components */
import Button from "@/widgets/button.vue";

const drawerStore = useDrawerStore();
const { $display, payload } = storeToRefs(drawerStore);
const { isMobile } = useMobile();
const compRef = ref({});

const onReset = () => {
  drawerStore.close();
  setTimeout(() => {
    drawerStore.$reset();
  }, 400 /** 動畫時間 */);
};

const onClose = async () => {
  if (compRef.value && "onDismissed" in compRef.value) {
    const result = await compRef.value.onDismissed();
    if (result) {
      drawerStore.$resolve({
        isConfirmed: false,
        isDismissed: true,
        result,
      });
      onReset();
    }
  } else {
    drawerStore.$resolve({
      isConfirmed: false,
      isDismissed: true,
    });
    onReset();
  }
};

const onConfirm = async () => {
  if (compRef.value && "onConfirmed" in compRef.value) {
    const result = await compRef.value.onConfirmed();
    if (result) {
      drawerStore.$resolve({
        isConfirmed: true,
        isDismissed: false,
        result,
      });
      onReset();
    }
  } else {
    drawerStore.$resolve({
      isConfirmed: true,
      isDismissed: false,
    });
    onReset();
  }
};
</script>
