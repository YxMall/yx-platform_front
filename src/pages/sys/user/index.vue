<template>
  <d2-container>
   <el-form
    :inline="true"
    :model="form"
    ref="form"
    style="margin-bottom: -18px;">

    <el-form-item label="状态" prop="status">
      <el-select
        v-model="form.status"
        placeholder="状态选择"
        style="width: 100px;">
        <el-option label="启动" value="1"/>
        <el-option label="禁用" value="0"/>
      </el-select>
    </el-form-item>

    <el-form-item label="用户名" prop="username">
      <el-input
        v-model="form.username"
        clearable
        placeholder="用户"
        style="width: 100px;"/>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleFormSubmit">
        <d2-icon name="search"/>
        查询
      </el-button>
    </el-form-item>

    <el-form-item>
      <el-button
        @click="handleFormReset">
        <d2-icon name="refresh"/>
        重置
      </el-button>
    </el-form-item>

  </el-form>
  <el-table
    :data="data"
    border
    style="width: 100%">
    <el-table-column
      prop="userId"
      label="ID" >
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="手机号">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间">
    </el-table-column>
  </el-table>
  </d2-container>
</template>

<script>
import { getUserData } from "@/api/sys/user";
export default {
  name: "user",
  data() {
    return {
      data: [],
      form: {
        username: "",
        status: "1"
      }
    };
  },
  mounted() {
    getUserData().then(res => {
      const { list, totalCount } = res;
      this.data = list;
    });
  },
  methods: {
    handleFormReset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>
