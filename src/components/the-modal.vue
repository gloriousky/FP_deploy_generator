<template>
  <el-dialog
    :model-value="$display"
    :title="payload.title"
    :before-close="onClose"
    show-close
  >
    <div v-if="payload.text">
      {{ payload.text }}
    </div>
    <component
      v-if="payload.component"
      :is="payload.component"
      ref="compRef"
      v-bind="payload.props"
    />
    <template #footer>
      <div class="mt-4 flex items-center justify-end gap-2">
        <Button
          v-if="payload.showCancelButton"
          type="default"
          class="w-20"
          @click="onClose"
        >
          {{ payload.cancelButtonText }}
        </Button>
        <Button
          v-if="payload.showConfirmButton"
          type="primary"
          class="w-20"
          @click="onConfirm"
        >
          {{ payload.confirmButtonText }}
        </Button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useModalStore } from "@/stores/modal-store";

/** components */
import Button from "@/widgets/button.vue";

const modalStore = useModalStore();
const { $display, payload } = storeToRefs(modalStore);
const compRef = ref({});

const onReset = () => {
  modalStore.close();
  setTimeout(() => {
    modalStore.$reset();
  }, 400 /** 動畫時間 */);
};

const onClose = async () => {
  if (compRef.value && "onDismissed" in compRef.value) {
    const result = await compRef.value.onDismissed();
    if (result) {
      modalStore.$resolve({
        isConfirmed: false,
        isDismissed: true,
        result,
      });
      onReset();
    }
  } else {
    modalStore.$resolve({
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
      modalStore.$resolve({
        isConfirmed: true,
        isDismissed: false,
        result,
      });
      onReset();
    }
  } else {
    modalStore.$resolve({
      isConfirmed: true,
      isDismissed: false,
    });
    onReset();
  }
};
</script>
