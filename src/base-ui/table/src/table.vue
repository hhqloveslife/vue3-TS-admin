<template>
  <div class="my-table">
    <div class="header">
      <slot name="header">
        <div class="title">
          <h2>{{ title }}</h2>
        </div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <!-- 表格主体 -->
    <el-table
      :data="listData"
      class="table"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column v-if="showSelectColumn" type="selection" align="center"></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        min-width="150"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          v-if="showFooter"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  listData: {
    type: Array as PropType<any[]>,
    required: true
  },
  dataCount: {
    type: Number,
    default: 0
  },
  propList: {
    type: Array as PropType<any[]>,
    required: true
  },
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  showSelectColumn: {
    type: Boolean,
    default: false
  },
  //分页器数据
  page: {
    type: Object,
    default: () => ({ currentPage: 0, pageSize: 10 })
  },
  childrenProps: {
    type: Object,
    default: () => ({})
  },
  showFooter: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:page', 'selectionChange'])

const handleSelectionChange = (value: any) => {
  emit('selectionChange', value)
}

//分页器的事件
const handleCurrentChange = (currentPage: number) => {
  emit('update:page', { ...props.page, currentPage })
}
const handleSizeChange = (pageSiza: number) => {
  emit('update:page', { ...props.page, pageSiza })
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.handler {
  width: 210px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
