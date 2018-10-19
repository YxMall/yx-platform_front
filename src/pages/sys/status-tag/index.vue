<template>
  <el-popover :placement="popoverPlacement"
              :title="popoverTitle"
              :width="popoverWidth"
              trigger="hover">
    <el-switch v-model="currentValue"
               :active-color="activeColor"
               :inactive-color="inactiveColor"
               :active-text="activeText"
               :inactive-text="inactiveText"
               :disabled="disabled"
               @change="handleChange">
    </el-switch>
    <span slot="reference">
      <slot v-if="value"
            name="active" />
      <slot v-else
            name="inactive" />
    </span>
  </el-popover>
</template>

<script>
import { enableStatus } from '@/api/sys/user';
export default {
  props: {
    value: {
      default: false
    },
    id: {
      default: 0
    },
    popoverPlacement: {
      default: 'left'
    },
    popoverTitle: {
      default: '修改'
    },
    popoverWidth: {
      default: '150'
    },
    activeColor: {
      default: '#67C23A'
    },
    inactiveColor: {
      default: '#F56C6C'
    },
    activeText: {
      default: '正常'
    },
    inactiveText: {
      default: '禁用'
    }
  },
  data () {
    return {
      currentValue: false,
      disabled: false
    }
  },
  watch: {
    value: {
      handler (val) {
        this.currentValue = val
      },
      immediate: true
    }
  },
  methods: {
    handleChange (val) {
      this.disabled = true
      this.$message({
        message: '正在发送请求',
        type: 'info'
      })
      // 异步请求
      enableStatus({ userId: this.id, status: val }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        });
      })
      // 如果修改失败的话需要在这里手动将 currentValue 复原
      this.$emit('change')
    }
  }
}
</script>
