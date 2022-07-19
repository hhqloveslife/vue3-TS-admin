import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  itemLayout: {
    padding: '10px 40px'
  },
  colLayout: {
    span: 8
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限管理',
      placeholder: '请输入密码'
    },
    {
      field: 'createdTime',
      type: 'datepicker',
      label: '创建时间',
      placeholder: '请选择创建时间',
      otherOptions: {
        //v-bind中不支持kebab-case，若要使用Kebab-case，在要加单引号
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
        type: 'daterange'
      }
    }
  ],
  itemStyle: {
    padding: '10px 40px'
  }
}
