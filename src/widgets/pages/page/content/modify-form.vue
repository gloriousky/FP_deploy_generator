<template>
  <div class="grid grid-cols-3 gap-x-4 gap-y-2">
    <FormInput
      class="col-span-2"
      :title="currentMessages('field.title')"
      v-model="form.title"
      :validator="validate.title"
      :placeholder="rootMessages('form.placeholder.input')"
      required
    />
    <FormRadio
      :title="currentMessages('field.status')"
      v-model="form.status"
      :validator="validate.status"
    >
      <option :value="0">
        {{ currentMessages("field.status.0") }}
      </option>
      <option :value="1">
        {{ currentMessages("field.status.1") }}
      </option>
    </FormRadio>
    <FormInput
      class="col-span-3"
      :title="currentMessages('field.content')"
      v-model="form.content"
      :validator="validate.content"
      :placeholder="rootMessages('form.placeholder.input')"
      required
    />
  </div>
</template>
<script setup>
import { useForm, required } from "@/hooks/use-form";
import { useI18nService } from "@/services/i18n-service";
import FormInput from "@/widgets/form/input.vue";
import FormRadio from "@/widgets/form/radio.vue";

const props = defineProps({
  data: Object,
});

const { t: rootMessages, scope } = useI18nService();
const { t: currentMessages } = scope("pages.page.content");
const { form, validate } = useForm(
  {
    title: props.data?.title ?? "",
    content: props.data?.content ?? "",
    status: props.data?.status ?? 1,
  },
  {
    validate: {
      rules: {
        title: {
          required,
        },
        content: {
          required,
        },
        status: {
          required,
        },
      },
    },
  },
);

const onConfirmed = () => {
  const invalid = form.$valid();
  if (invalid) return;

  return form.$request();
};

defineExpose({
  onConfirmed,
});
</script>
