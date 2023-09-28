<template>
  <div class="grid gap-y-2">
    <FormInput
      :title="currentMessages('field.title')"
      v-model="form.keyword"
      :placeholder="rootMessages('form.placeholder.input')"
    />
    <FormSelect :title="currentMessages('field.status')" v-model="form.status">
      <option value="">不限</option>
      <option value="1">啟用</option>
      <option value="0">停用</option>
    </FormSelect>
  </div>
</template>
<script setup>
import { useForm } from "@/hooks/use-form";
import { useI18nService } from "@/services/i18n-service";
import FormInput from "@/widgets/form/input.vue";
import FormSelect from "@/widgets/form/select.vue";

const props = defineProps({
  data: Object,
});

const { t: rootMessages, scope } = useI18nService();
const { t: currentMessages } = scope("pages.page.content");
const { form } = useForm({
  keyword: props.data.keyword,
  status: props.data.status,
});

const onConfirmed = () => {
  return form.$request();
};

defineExpose({
  onConfirmed,
});
</script>
