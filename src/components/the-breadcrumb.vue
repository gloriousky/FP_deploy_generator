<template>
  <ol class="list-reset flex text-sm">
    <template
      v-for="(breadcrumb, idx) in breadcrumbs"
      :key="`breadcrumb--${idx}`"
    >
      <li v-if="idx !== 0"><span class="mx-2 text-gray-500">/</span></li>
      <li>
        <span
          v-if="idx === breadcrumbs.length - 1"
          class="text-primary-600 dark:text-white"
        >
          {{ t(breadcrumb) }}
        </span>
        <span v-else href="#" class="text-gray-500">
          {{ t(breadcrumb) }}
        </span>
      </li>
    </template>
  </ol>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useBreadcrumbStore } from "@/stores/breadcrumb-store";
import { useI18nService } from "@/services/i18n-service";

const breadcrumbStore = useBreadcrumbStore();
const { breadcrumbs } = storeToRefs(breadcrumbStore);
const { t } = useI18nService();
</script>
