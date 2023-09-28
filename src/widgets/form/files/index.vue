<template>
  <Validate
    :title="title"
    :required="required"
    :validator="validator"
    :hint="hint"
  >
    <template #control="{ isInvalid }">
      <div
        ref="zoneEl"
        @drop.prevent="onDrop"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @click="onZoneClick"
        class="zone"
        :class="{
          'zone--disabled': readonly,
          'zone--flex': isEmpty,
          'zone--invalid': isInvalid,
        }"
      >
        <div v-if="isEmpty" class="zone__placeholder">
          <el-icon class="zone__placeholder__icon">
            <UploadFilled />
          </el-icon>
          <div class="zone__placeholder__text">
            {{ currentMessages("placeholder") }}
          </div>
        </div>
        <div
          v-else
          class="zone__display"
          :class="{ 'zone__display--center': !isMultiple }"
        >
          <div
            v-for="(file, idx) in display"
            :key="idx"
            class="zone__display__item"
            @click.stop
          >
            <div
              v-if="file.isImage"
              class="zone__display__item__thumb"
              :style="`background-image:url(${file.url})`"
            ></div>
            <div v-else class="zone__display__item__icon">
              <el-icon>
                <component :is="file.icon"></component>
              </el-icon>
            </div>

            <div v-if="!readonly" class="zone__display__item__actions">
              <span v-if="removeable" @click="onRemove(idx)">
                <el-icon><Delete /></el-icon>
              </span>
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        ref="inputEl"
        :multiple="isMultiple"
        :accept="accept"
        :readonly="readonly"
        @change="onChanged"
        hidden
      />
    </template>
    <template v-if="'hint' in slots" #hint>
      <slot name="hint"></slot>
    </template>
  </Validate>
</template>

<script setup>
import { ref, computed, useSlots } from "vue";
import { useI18nService } from "@/services/i18n-service";

/** icons */
import { UploadFilled, Delete } from "@element-plus/icons-vue";

/** component */
import Validate from "../validate.vue";

/** helper */
import $ from "jquery";
import { map, remove } from "ramda";
import {
  iconComputed,
  getFileMime,
  getFileName,
  getUrlPathName,
} from "./ext-helper";

const props = defineProps({
  title: String,
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: String,
  hint: String,
  accept: String,
  removeable: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [Array, Object],
    default: () => [],
  },
  validator: Object,
});

const emit = defineEmits(["update:modelValue"]);

const slots = useSlots();
const { scope } = useI18nService();
const { t: currentMessages } = scope("widgets.form-files");
const zoneEl = ref();
const inputEl = ref();
const isMultiple = computed(() => Array.isArray(props.modelValue));
const isEmpty = computed(() => {
  if (isMultiple.value) {
    return props.modelValue.length === 0;
  } else {
    return !props.modelValue;
  }
});

const display = computed(() => {
  if (isMultiple.value) {
    return map((file) => {
      if (file instanceof File) {
        return {
          isImage: file.type?.split("/")[0] === "image",
          type: file.type,
          icon: iconComputed(file.type),
          url: URL.createObjectURL(file),
          uploaded: false,
        };
      } else {
        const name = file.name ?? getFileName(getUrlPathName(file.url));
        const type = file.mime ?? getFileMime(name);
        return {
          isImage: type.split("/")[0] === "image",
          type,
          icon: iconComputed(type),
          url: file.url,
          uploaded: true,
        };
      }
    }, props.modelValue);
  } else {
    const file = props.modelValue;
    if (!file) return [];

    if (file instanceof File) {
      return [
        {
          isImage: file.type?.split("/")[0] === "image",
          type: file.type,
          icon: iconComputed(file.type),
          url: URL.createObjectURL(file),
          uploaded: false,
        },
      ];
    } else {
      const type = file.mime ?? getFileMime(name);
      return [
        {
          isImage: type.split("/")[0] === "image",
          type,
          icon: iconComputed(type),
          url: file.url,
          uploaded: true,
        },
      ];
    }
  }
});

const updateModel = (value) => {
  if (isMultiple.value) {
    let files = [];
    for (let i = 0; i < value.length; i++) {
      files = [...files, value[i]];
    }
    emit("update:modelValue", [...props.modelValue, ...files]);
  } else {
    const file = value?.[0] ?? null;
    emit("update:modelValue", file);
  }
};

const onRemove = (idx) => {
  if (isMultiple.value) {
    emit("update:modelValue", remove(idx, 1, props.modelValue));
  } else {
    emit("update:modelValue", null);
  }
};

const onChanged = (e) => {
  updateModel(e.target.files);
  inputEl.value.value = "";
};

const onDrop = (e) => {
  if (props.readonly) return;
  $(zoneEl.value).removeClass("zone--hover");
  updateModel(e.dataTransfer.files);
};

const onDragOver = () => {
  if (props.readonly) return;
  $(zoneEl.value).addClass("zone--hover");
};

const onDragLeave = () => {
  if (props.readonly) return;
  $(zoneEl.value).removeClass("zone--hover");
};

const onZoneClick = () => {
  if (props.readonly) return;
  $(inputEl.value).click();
};
</script>
