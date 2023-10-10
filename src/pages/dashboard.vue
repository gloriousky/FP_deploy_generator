<template>
  <div>
    <div class="mb-5">hello {{ userInfo.fullName }} !</div>
    <Card>
      <template #title>Buttons</template>
      <div class="space-y-4">
        <div class="space-x-2">
          <Button type="default">Default</Button>
          <Button type="primary">Primary</Button>
          <Button type="success">Success</Button>
          <Button type="info">Info</Button>
          <Button type="warning">Warning</Button>
          <Button type="danger">Danger</Button>
        </div>
        <div class="space-x-2">
          <Button type="default" disabled>Default</Button>
          <Button type="primary" disabled>Primary</Button>
          <Button type="success" disabled>Success</Button>
          <Button type="info" disabled>Info</Button>
          <Button type="warning" disabled>Warning</Button>
          <Button type="danger" disabled>Danger</Button>
        </div>
        <div class="space-x-2">
          <Button type="default" loading>Default</Button>
          <Button type="primary" loading>Primary</Button>
          <Button type="success" loading>Success</Button>
          <Button type="info" loading>Info</Button>
          <Button type="warning" loading>Warning</Button>
          <Button type="danger" loading>Danger</Button>
        </div>
        <div class="space-x-2">
          <Button :icon="Edit">編輯</Button>
          <Button type="danger" :icon="Delete">刪除</Button>
          <Button type="default" :icon="Search">查詢</Button>
        </div>
        <div class="space-x-2">
          <Button size="sm">Small</Button>
          <Button size="base">Base</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
    </Card>

    <Card class="mt-4">
      <template #title>Dialog</template>
      <div class="space-y-4">
        <div class="space-x-2">
          <Button type="info" @click="alertInfo"> Alert Info </Button>
          <Button type="success" @click="alertSuccess"> Alert Success </Button>
          <Button type="warning" @click="alertWarning"> Alert Warning </Button>
          <Button type="danger" @click="alertDanger"> Alert Danger </Button>
        </div>
        <div class="space-x-2">
          <Button type="info" @click="confirmInfo"> Confirm Info </Button>
          <Button type="success" @click="confirmSuccess">
            Confirm Success
          </Button>
          <Button type="warning" @click="confirmWarning">
            Confirm Warning
          </Button>
          <Button type="danger" @click="confirmDanger"> Confirm Danger </Button>
        </div>
        <div class="space-x-2">
          <Button @click="prompt">prompt</Button>
          <Button @click="promptWithValidate">prompt with validate</Button>
          <Button @click="promptWithValidate2">prompt with validate 2</Button>
          <Button @click="promptWithValidate3">custom invalid message</Button>
        </div>
      </div>
    </Card>

    <Card class="mt-4">
      <template #title>Message</template>
      <div class="space-x-2">
        <Button type="info" @click="messageInfo"> Message Info </Button>
        <Button type="success" @click="messageSuccess">
          Message Success
        </Button>
        <Button type="warning" @click="messageWarning">
          Message Warning
        </Button>
        <Button type="danger" @click="messageDanger"> Message Danger </Button>
      </div>
    </Card>

    <Card class="mt-4">
      <template #title>Dropdown</template>
      <div class="space-y-4">
        <div class="space-x-2">
          <Dropdown>
            Dropdown List
            <template #menu>
              <option value="a">Action 1</option>
              <option value="b">Action 2</option>
              <option value="c">Action 3</option>
              <option value="d" disabled>Action 4</option>
              <option value="e" divided>Action 5</option>
            </template>
          </Dropdown>
        </div>
        <div class="space-x-2">
          <Dropdown :arrow="false">
            <Button>Custom Style Dropdown</Button>
            <template #menu>
              <option value="a">Action 1</option>
              <option value="b">Action 2</option>
              <option value="c">Action 3</option>
              <option value="d" disabled>Action 4</option>
              <option value="e" divided>Action 5</option>
            </template>
          </Dropdown>
        </div>
        <div class="space-x-2">
          <Dropdown @command="onDropdownClick">
            Command event
            <template #menu>
              <option value="1">Action 1</option>
              <option value="2">Action 2</option>
              <option value="3">Action 3</option>
              <option value="4" disabled>Action 4</option>
              <option value="5" divided>Action 5</option>
            </template>
          </Dropdown>
        </div>
        <div class="space-x-2">
          <Dropdown @command="onDropdownClick">
            With Node
            <template #menu>
              <option value="confirmInfo">
                <div @click="confirmInfo">Confirm Info</div>
              </option>
              <option value="confirmSuccess">
                <div @click="confirmSuccess">Confirm Success</div>
              </option>
              <option value="confirmWarning">
                <div @click="confirmWarning">Confirm Warning</div>
              </option>
            </template>
          </Dropdown>
        </div>
      </div>
    </Card>

    <Card class="mt-4">
      <template #title>Select</template>
      <div class="w-full space-x-2 pt-4 lg:w-96">
        <Select
          placeholder="Please select..."
          :model-value="null"
          @update:model-value="onSelectChanged"
        >
          <option value="1">Item 1</option>
          <option value="2" disabled>Item 2</option>
          <option value="3">Item 3</option>
        </Select>
      </div>
      <div class="w-full space-x-2 pt-4 lg:w-96">
        <Select placeholder="Multiple Select" v-model="selectVals">
          <option value="1">Item 1</option>
          <option value="2" disabled>Item 2</option>
          <option value="3">Item 3</option>
          <option value="4">Item 4</option>
        </Select>
      </div>
      <div class="w-full space-x-2 pt-4 lg:w-96">
        <Select placeholder="Custom Option">
          <option value="edit">
            <div
              class="relative flex h-full w-full items-center justify-start text-sm"
            >
              <el-icon :size="20">
                <Edit />
              </el-icon>
              <div class="ml-1">Option Edit</div>
            </div>
          </option>
          <option value="search">
            <div
              class="relative flex h-full w-full items-center justify-start text-sm"
            >
              <el-icon :size="20">
                <Search />
              </el-icon>
              <div class="ml-1">Option Search</div>
            </div>
          </option>
        </Select>
      </div>
      <div class="w-full space-x-2 pt-4 lg:w-96">
        <Select placeholder="Virtualized Select">
          <option v-for="item in selectOptions" :key="item.value">
            {{ item.label }}
          </option>
        </Select>
      </div>
    </Card>

    <div class="mt-4 grid grid-cols-3 gap-4">
      <Card>
        <template #title>Checkbox</template>
        <Checkbox
          v-model="checkboxVals"
          @change="onCheckboxChange"
          @command="onCheckboxCommand"
        >
          <option value="us" custom="United States">United States</option>
          <option value="ge" custom="Germany">Germany</option>
          <option value="sp" custom="Spain">Spain</option>
        </Checkbox>
      </Card>
      <Card>
        <template #title>Radio Buttons</template>
        <Radio
          v-model="radioVals"
          @change="onRadioChange"
          @command="onRadioCommand"
        >
          <option value="us" custom="United States">United States</option>
          <option value="ge" custom="Germany">Germany</option>
          <option value="sp" custom="Spain">Spain</option>
        </Radio>
      </Card>
      <Card>
        <template #title>Switch</template>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col">
            <Switch v-model="switchVal" />
            <Switch :model-value="switchManualVal" @change="onManualChange" />
          </div>
          <div class="flex flex-col">
            <Switch :model-value="true" readonly />
            <Switch readonly />
          </div>
        </div>
      </Card>
    </div>

    <div class="mt-4 grid grid-cols-2 gap-4">
      <Card>
        <template #title>Table</template>
        <Table
          :data="[
            { name: 'John', age: 32, gender: 'Male' },
            { name: 'Johnny', age: 4, gender: 'Male' },
            { name: 'Mary', age: 16, gender: 'Female' },
          ]"
        >
          <TableColumn field="name" title="姓名" />
          <TableColumn field="age" title="年齡" />

          <!-- custom column -->
          <TableColumn field="gender" title="性別">
            <template v-slot="{ row }">
              {{ row.gender === "Male" ? "男" : "女" }}
            </template>
          </TableColumn>

          <template #footer> Display a message in the footer </template>
        </Table>
      </Card>

      <Card>
        <template #title>Table Selection</template>
        <Table
          :data="[
            { name: 'John', age: 32, gender: 'Male' },
            { name: 'Johnny', age: 4, gender: 'Male' },
            { name: 'Mary', age: 16, gender: 'Female' },
          ]"
          :selection="{
            change: onRowSelection,
          }"
        >
          <TableColumn field="name" title="姓名" />
          <TableColumn field="age" title="年齡" />
          <TableColumn field="gender" title="性別" />
        </Table>
      </Card>
    </div>

    <div class="mt-4 grid grid-cols-2 gap-4">
      <Card>
        <template #title>Sorting</template>
        <Table
          :data="[
            { name: 'John', age: 32, gender: 'Male' },
            { name: 'Johnny', age: 4, gender: 'Male' },
            { name: 'Mary', age: 16, gender: 'Female' },
          ]"
          :sort="{
            default: { prop: 'age', order: 'ascending' },
            change: onTableSortChange,
          }"
        >
          <TableColumn
            field="name"
            title="姓名"
            sortable
            :sort-method="onTableNameLengthSort"
          />
          <TableColumn field="age" title="年齡" sortable />
          <TableColumn field="gender" title="性別">
            <template v-slot="{ row }">
              {{ row.gender === "Male" ? "男" : "女" }}
            </template>
          </TableColumn>
        </Table>
      </Card>

      <Card>
        <template #title>Align</template>
        <Table
          :data="[
            {
              name: 'John',
              note: 'Xdzfqlqr Lrnjehtjm Fjjyzcikc Hgcdzwxb Hkvxlblpjg',
            },
            {
              name: 'Johnny',
              note: 'Xdzfqlqr Lrnjehtjm Fjjyzcikc Hgcdzwxb Hkvxlblpjg',
            },
            { name: 'Mary', note: '' },
          ]"
          :index="false"
        >
          <TableColumn field="name" title="姓名" width="100" align="center" />
          <TableColumn
            field="note"
            title="備註"
            class-name="w-full"
            align="left"
          />
        </Table>
      </Card>
    </div>

    <div class="mt-4 grid grid-cols-2 gap-4">
      <Card>
        <template #title>File Upload</template>
        <FormFiles
          v-model="fileVal"
          accept=".jpg, .png"
          hint="jpg/png files with a size less than 500kb"
        />
      </Card>

      <Card>
        <template #title>File Upload Preview</template>
        <FormFiles
          :model-value="{
            name: '125x125.jpg',
            mime: 'image/jpeg',
            url: 'http://dummyimage.com/125x125',
          }"
          readonly
        />
      </Card>
    </div>

    <Card class="mt-4">
      <template #title>File Upload Multiple</template>
      <FormFiles v-model="filesVal" />
    </Card>

    <Card class="mt-4">
      <template #title>Tabs</template>
      <Tabs
        v-model="tabVal"
        @change="onTabChange"
        @before-leave="onTabBeforeLeave"
      >
        <TabPane label="User" name="first">User</TabPane>
        <TabPane label="Config" name="second">Config</TabPane>
        <TabPane label="Role" name="third">Role</TabPane>
        <TabPane label="Task" name="fourth" disabled>Task</TabPane>
        <TabPane label="Confirm" name="confirm">Confirm</TabPane>
        <TabPane name="custom">
          <template #label>
            <el-icon><Calendar /></el-icon>
            <span class="ml-1">Calendar Label</span>
          </template>
          Calendar
        </TabPane>
      </Tabs>
    </Card>

    <div class="mt-4 grid grid-cols-2 gap-4">
      <div>
        <Card>
          <template #title>Form</template>
          <FormInput title="Name" required />
          <FormInput title="Company" hint="ex. Google" />
          <FormInput title="Email" model-value="aaa@gmail.com">
            <template #hint>
              We’ll never share your details. Read our
              <a
                href="#"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                @click.prevent
              >
                Privacy Policy </a
              >.
            </template>
          </FormInput>
          <FormRadio title="Married">
            <option>N</option>
            <option>Y</option>
          </FormRadio>
          <FormCheckbox title="Checkbox">
            <option>Light</option>
            <option>Green</option>
            <option>Blue</option>
            <option>Red</option>
            <option>Purple</option>
          </FormCheckbox>
          <FormSelect title="Selected" model-value="Light">
            <option>Light</option>
            <option>Green</option>
            <option>Blue</option>
            <option>Red</option>
            <option>Purple</option>
          </FormSelect>
        </Card>
      </div>

      <div>
        <Card>
          <template #title>Validation</template>
          <FormInput
            title="Name"
            v-model="form.name"
            :validator="validate.name"
            required
          />
          <FormInput
            title="Email"
            v-model="form.email"
            :validator="validate.email"
            required
          >
            <template #hint>
              We’ll never share your details. Read our
              <a
                href="#"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                @click.prevent
              >
                Privacy Policy </a
              >.
            </template>
          </FormInput>
          <FormRadio
            title="Married"
            v-model="form.married"
            :validator="validate.married"
            required
          >
            <option>N</option>
            <option>Y</option>
          </FormRadio>
          <FormFiles
            title="Cover"
            v-model="form.cover"
            accept=".jpg, .png"
            hint="jpg/png files with a size less than 500kb"
            :validator="validate.cover"
            required
          />
          <FormCheckbox
            title="Checkbox"
            v-model="form.checkbox"
            :validator="validate.checkbox"
            required
          >
            <option>Light</option>
            <option>Green</option>
            <option>Blue</option>
            <option>Red</option>
            <option>Purple</option>
          </FormCheckbox>
          <FormSelect
            title="Selected"
            v-model="form.selected"
            :validator="validate.selected"
            required
          >
            <option>Light</option>
            <option>Green</option>
            <option>Blue</option>
            <option>Red</option>
            <option>Purple</option>
          </FormSelect>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth-store";

/** services */
import { useDialogService } from "@/services/dialog-service";
import { useMessageService } from "@/services/message-service";

/** hook */
import { useForm, required, email, sameAs, maxSize } from "@/hooks/use-form";

/** components */
import Card from "@/widgets/card";
import { Delete, Edit, Search, Calendar } from "@element-plus/icons-vue";
import Button from "@/widgets/button";
import Dropdown from "@/widgets/dropdown";
import Select from "@/widgets/select";
import Checkbox from "@/widgets/checkbox";
import Radio from "@/widgets/radio";
import { Table, TableColumn } from "@/widgets/table";
import Switch from "@/widgets/switch";
import FormFiles from "@/widgets/form/files";
import { Tabs, TabPane } from "@/widgets/tabs";

defineOptions({
  breadcrumbs: ["首頁", "儀表板"],
});

const authStore = useAuthStore();
const { userInfo } = storeToRefs(authStore);

/**
 * Dialogs
 */
const dialogService = useDialogService();
const alertInfo = () =>
  dialogService.alertInfo({
    title: "Alert Info Title",
    message: "Message content.",
    confirmButtonText: "知道了",
  });
const alertSuccess = () =>
  dialogService.alertSuccess({
    title: "Alert Success Title",
    message: "Message content.",
    confirmButtonText: "知道了",
  });
const alertWarning = () =>
  dialogService.alertWarning({
    title: "Alert Warning Title",
    message: "Message content.",
    confirmButtonText: "知道了",
  });
const alertDanger = () =>
  dialogService.alertDanger({
    title: "Alert Danger Title",
    message: "Message content.",
    confirmButtonText: "知道了",
  });
const confirmInfo = () =>
  dialogService.confirmInfo({
    title: "Confirm Info Title",
    message: "Message content.",
    confirmButtonText: "知道了",
    cancelButtonText: "取消",
  });
const confirmSuccess = () =>
  dialogService.confirmSuccess({
    title: "Confirm Success Title",
    message: "Message content.",
    confirmButtonText: "知道了",
    cancelButtonText: "取消",
  });
const confirmWarning = () =>
  dialogService.confirmWarning({
    title: "Confirm Warning Title",
    message: "Message content.",
    confirmButtonText: "知道了",
    cancelButtonText: "取消",
  });
const confirmDanger = () =>
  dialogService.confirmDanger({
    title: "Confirm Danger Title",
    message: "Message content.",
    confirmButtonText: "知道了",
    cancelButtonText: "取消",
  });
const prompt = () => {
  dialogService.alertInfo({
    title: "Prompt Title",
    message: "Message content.",
    confirmButtonText: "Done",
    input: {
      type: "text",
      placeholder: "Input Something...",
    },
  });
};
const promptWithValidate = () => {
  dialogService.confirmInfo({
    title: "Prompt Title",
    message: "Message content.",
    confirmButtonText: "Done",
    input: {
      type: "text",
      placeholder: "Input Something...",
      validator(val) {
        switch (true) {
          case val === null:
          case val === undefined:
          case val === "":
            return "Invalid message.";

          default:
            return true;
        }
      },
    },
  });
};
const promptWithValidate2 = () => {
  dialogService.confirmInfo({
    title: "Prompt Title",
    message: "Message content.",
    confirmButtonText: "Done",
    input: {
      type: "text",
      placeholder: "Input Something...",
      validatRules: {
        required,
      },
    },
  });
};
const promptWithValidate3 = () => {
  dialogService.confirmInfo({
    title: "Prompt Title",
    message: "Message content.",
    confirmButtonText: "Done",
    input: {
      type: "text",
      placeholder: "Input Something...",
      validatRules: {
        required,
      },
      validatMessages: {
        required: "Invalid message.",
      },
    },
  });
};

/**
 * Messages
 */
const messageService = useMessageService();
const messageInfo = () => {
  messageService.info("Message Info");
};
const messageSuccess = () => {
  messageService.success("Message Success");
};
const messageWarning = () => {
  messageService.warning("Message Warning");
};
const messageDanger = () => {
  messageService.danger("Message Danger");
};

/** Dropdown */
const onDropdownClick = (val) => {
  messageService.info("Click Action " + val);
};

/** checkbox */
const checkboxVals = ref([]);
const onCheckboxChange = (vals) => {
  console.log(vals);
};
const onCheckboxCommand = (val, scope) => {
  console.log(val, scope);
};

/** radio */
const radioVals = ref("");
const onRadioChange = (val) => {
  console.log(val);
};
const onRadioCommand = (val, scope) => {
  console.log(val, scope);
};

/** Select */
const selectVals = ref([]);
const onSelectChanged = (value) => {
  messageService.info("Select Item " + value);
};
const initials = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const selectOptions = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}));

/** switch */
const switchVal = ref(true);
const switchManualVal = ref(false);
const onManualChange = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      switchManualVal.value = !switchManualVal.value;
      resolve(true);
    }, 1000);
  });
};

/** file */
const fileVal = ref(null);
const filesVal = ref([
  {
    name: "125x125.jpg",
    mime: "image/jpeg",
    url: "http://dummyimage.com/125x125",
  },
]);

/** Table */
const onRowSelection = (rows) => {
  console.log(rows);
};
const onTableSortChange = console.log;
const onTableNameLengthSort = (next, prev) => {
  return next.name.length - prev.name.length;
};
/** tab */
const tabVal = ref("first");
const onTabChange = (paneName) => {
  console.log("tab change to:", paneName);
};
const onTabBeforeLeave = async (activeName, oldActiveName) => {
  if (oldActiveName === "confirm") {
    const { isDismissed } = await dialogService.confirmInfo({
      title: "Notice",
      message: "Change Tab ?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (isDismissed) return false;
  }
  return true;
};

/** form */
import FormInput from "@/widgets/form/input.vue";
import FormRadio from "@/widgets/form/radio.vue";
import FormCheckbox from "@/widgets/form/checkbox.vue";
import FormSelect from "@/widgets/form/select.vue";
const { form, validate } = useForm(
  {
    name: "",
    email: "",
    married: "N",
    cover: null,
    checkbox: [],
    selected: null,
  },
  {
    validate: {
      rules: {
        name: {
          required,
        },
        email: {
          required,
          email,
        },
        married: {
          sameAs: sameAs("Y"),
        },
        cover: {
          required,
          maxSize: maxSize(500000),
        },
        checkbox: {
          required,
        },
        selected: {
          required,
        },
      },
    },
  },
);
form.$valid();
</script>
