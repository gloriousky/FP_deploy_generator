<template>
  <div>
    <the-records-header>
      <template #title>文章內容</template>
      <template #actions>
        <Button type="primary" :icon="Edit" @click="onCreate">
          {{ currentMessages("action.create") }}
        </Button>
        <Button type="default" :icon="Filter" @click="onSearch">
          {{ rootMessages("button.search") }}
        </Button>
      </template>
    </the-records-header>

    <Table :data="records">
      <TableColumn
        field="title"
        :title="currentMessages('field.title')"
        min-width="250"
      />
      <TableColumn
        field="status"
        :title="currentMessages('field.status')"
        width="80"
        mobile-hidden
      >
        <template v-slot="{ row }">
          <span
            v-if="row.status"
            class="text-xs text-green-600 dark:text-green-500"
          >
            {{ currentMessages("field.status.1") }}
          </span>
          <span v-else class="text-xs text-red-600 dark:text-red-500">
            {{ currentMessages("field.status.0") }}
          </span></template
        >
      </TableColumn>
      <TableColumn width="120">
        <template v-slot="{ row }">
          <div class="flex justify-end gap-1">
            <Button type="default" size="sm" @click="onUpdate(row)">
              {{ rootMessages("button.edit") }}
            </Button>
            <Button type="danger" size="sm" @click="onDelete(row.id)">
              {{ rootMessages("button.delete") }}
            </Button>
          </div>
        </template>
      </TableColumn>
      <template #footer>
        <div class="flex items-center justify-between">
          <div>
            {{ rootMessages("widgets.records.total", { count: totalRecords }) }}
          </div>
          <Pagination
            :total="totalRecords"
            :perpage="perPage"
            :page="page"
            @update:page="onPageChanged"
          />
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

/** stores */
import { useModalStore } from "@/stores/modal-store";
import { useDrawerStore } from "@/stores/drawer-store";
import { usePageContentStore } from "@/stores/page/content-store";
import { useI18nService } from "@/services/i18n-service";
import { useDialogService } from "@/services/dialog-service";

/** hooks */
import { useForm } from "@/hooks/use-form";
import { useFeedbackMessage } from "@/hooks/use-feedback-message";

/** components */
import { Edit, Filter } from "@element-plus/icons-vue";
import { Table, TableColumn } from "@/widgets/table";
import Pagination from "@/widgets/pagination.vue";
import Button from "@/widgets/button.vue";
import ModifyForm from "@/widgets/pages/page/content/modify-form.vue";
import SearchForm from "@/widgets/pages/page/content/search-form.vue";

defineOptions({
  breadcrumbs: ["主選單", "文章管理", "文章內容"],
});

const modalStore = useModalStore();
const drawerStore = useDrawerStore();
const contentStore = usePageContentStore();
const { records, totalRecords, perPage, page } = storeToRefs(contentStore);
const { t: rootMessages, scope } = useI18nService();
const { t: currentMessages } = scope("pages.page.content");
const dialogService = useDialogService();
const { form: condition } = useForm({
  keyword: "",
  status: "",
  page: 1,
});

const feedback = useFeedbackMessage();

const getRecords = () => {
  return Promise.all([
    contentStore.readList(condition),
    contentStore.readTotal(),
    //
  ]);
};

const onPageChanged = (val) => {
  condition.page = val;
  getRecords();
};

const onSearch = async () => {
  const { isConfirmed, result } = await drawerStore.fire({
    title: currentMessages("action.search"),
    component: SearchForm,
    confirmButtonText: rootMessages("button.search"),
    props: {
      data: condition,
    },
  });
  if (isConfirmed) {
    condition.keyword = result.keyword;
    condition.status = result.status;
    condition.page = 1;
    getRecords();
  }
};

const onCreate = async () => {
  const { isConfirmed, result } = await modalStore.fire({
    title: currentMessages("action.create"),
    component: ModifyForm,
    cancelButtonText: rootMessages("button.cancel"),
    confirmButtonText: rootMessages("button.create"),
  });
  if (isConfirmed) {
    const resCode = await contentStore.create(result);
    if (resCode !== 0) {
      feedback.createFailed(resCode);
      return;
    }
    feedback.createSuccess();
    condition.$reset();
    getRecords();
  }
};

const onUpdate = async (data) => {
  const { isConfirmed, result } = await modalStore.fire({
    title: currentMessages("action.create"),
    component: ModifyForm,
    cancelButtonText: rootMessages("button.cancel"),
    confirmButtonText: rootMessages("button.save"),
    props: {
      data,
    },
  });
  if (isConfirmed) {
    const resCode = await contentStore.update({
      id: data.id,
      ...result,
    });
    if (resCode !== 0) {
      feedback.updateFailed(resCode);
      return;
    }
    feedback.updateSuccess();
    getRecords();
  }
};

const onDelete = async (id) => {
  const { isConfirmed } = await dialogService.confirmDanger({
    title: rootMessages("app.delete.confirm.title"),
    message: rootMessages("app.delete.confirm.text"),
    confirmButtonText: rootMessages("button.ok"),
    cancelButtonText: rootMessages("button.cancel"),
  });
  if (isConfirmed) {
    const resCode = await contentStore.delete({ id });
    if (resCode !== 0) {
      feedback.deleteFailed(resCode);
      return;
    }
    feedback.deleteSuccess();
    if (records.data.length === 1 && condition.page > 1) {
      condition.page -= 1;
    }
    getRecords();
  }
};

onMounted(() => {
  getRecords();
});
</script>
