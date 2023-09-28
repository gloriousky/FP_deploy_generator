<template>
  <div class="p-6 dark:bg-white">
    <FormInput
      class="mb-4"
      :title="currentMessages('field.account')"
      v-model="form.account"
      :validator="validate.account"
    />
    <FormInput
      type="password"
      class="mb-4"
      :title="currentMessages('field.password')"
      v-model="form.password"
      :validator="validate.password"
    />
    <Checkbox class="mb-4" v-model="form.remember" :value="1">
      <span class="ml-2 text-sm font-medium text-slate-500">
        {{ currentMessages("field.remember") }}
      </span>
    </Checkbox>
    <div class="mt-4">
      <Button @click="onLogin" size="lg" full>
        {{ currentMessages("submit") }}
      </Button>
    </div>
  </div>
</template>
<script setup>
import { watch, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

/** stores */
import { useAuthStore } from "@/stores/auth-store";

/** service */
import { useMessageService } from "@/services/message-service";
import { useI18nService } from "@/services/i18n-service";

/** hooks */
import { useForm, required } from "@/hooks/use-form";

/** components */
import Button from "@/widgets/button.vue";
import FormInput from "@/widgets/form/input.vue";
import Checkbox from "@/widgets/checkbox.vue";

defineOptions({
  layout: "layout-login",
});

const router = useRouter();
const authStore = useAuthStore();
const messageService = useMessageService();
const { scope } = useI18nService();
const { t: currentMessages } = scope("pages.login");
const { form, validate } = useForm(
  {
    account: "admin",
    password: "admin123",
    remember: true,
  },
  {
    validate: {
      rules: {
        account: { required },
        password: { required },
      },
    },
    request: {
      transfer: {
        remember: (arr) => arr[0] ?? false,
      },
    },
  },
);

const onLogin = async () => {
  if (form.$valid()) return false;
  const res = await authStore.login(form.$request());
  if (!res.code === 0) {
    messageService.danger(currentMessages("feedback.failed"));
    return;
  }
  messageService.success(currentMessages("feedback.success"));
  router.push({ name: "default-path" });
};

watch(
  () => form.remember,
  (val) => {
    if (!val) authStore.clearAuthKeep();
  },
);

onBeforeMount(() => {
  const keepAccount = authStore.authKeep;
  if (keepAccount && keepAccount !== "null") {
    form.remember = true;
    form.account = keepAccount;
  }
});
</script>
