<template>
  <div>
    <el-form
      ref="formRef"
      :model="formData"
      scroll-to-error
      @validate="handleValidate"
    >
      <el-table :data="formData.tableData" row-key="id" border>
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          v-bind="item"
        >
          <template #header>
            <span
              v-if="item.required"
              class="require-class"
              style="color: #ff0000; vertical-align: middle; margin-right: 5px"
              >*</span
            >
            <span>{{ item.label }}</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              v-if="item.editable"
              :rules="item.rules"
              :prop="`tableData.${$index}.${item.prop}`"
            >
              <component
                :is="item.type"
                v-model.number="row[item.prop]"
                v-bind="item.config"
              ></component>
            </el-form-item>

            <span v-else>{{ row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElInput } from "element-plus";
const currentMonth = new Date().getMonth() + 1;
const formRef = ref(null);
const tableData = ref([]);
const columns =
  "基地，工厂，基本信息，1月，2月，3月，4月，5月，6月，7月，8月，9月，10月，11月，12月"
    .split("，")
    .map((item, index) => {
      return {
        label: item,
        prop: `aa${index}`,
        align: "center",
        minWidth: 100,
        editable: index > 2,
        required: index >= currentMonth + 2 && index < currentMonth + 5,
        rules: [
          {
            required: index >= currentMonth + 2 && index < currentMonth + 5,
            message: `请输入${item}`,
            trigger: "blur",
          },
          {
            type: "number",
            message: "请输入数字",
            trigger: "blur",
          },
        ],
        type: ElInput,
      };
    });
console.log(columns);
const row = {};
"基地，工厂，基本信息，1月，2月，3月，4月，5月，6月，7月，8月，9月，10月，11月，12月"
  .split("，")
  .forEach((item, index) => {
    row[`aa${index}`] = index;
  });
tableData.value.push({ id: "1", ...row });
const formData = reactive({ tableData: tableData });

const handleValidate = (prop, isValid, message) => {
  // console.log(formData)
  // console.log(prop, formData[prop])
  // console.log(prop, isValid, message)
};
</script>

<style scoped></style>
