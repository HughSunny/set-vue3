<template>
  <a-modal
    width="600px"
    :open="visible"
    :title="$t('sys.user.changePassword')"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 17 }"
      :rules="rules"
    >
      <a-row class="change-password-form">
        <a-col :span="24">
          <a-form-item :label="$t('sys.user.oldPassword')" name="oldPwd">
            <div class="password_input_container">
              <a-input
                v-model:value="formState.oldPwd"
                :maxlength="30"
                :placeholder="$t('sys.action.pleaseInput',  { label: $t('sys.user.oldPassword')})"
                :type="state.showOldPwdType"
              />
              <eye-outlined
                v-show="state.showOldPwd"
                class="password_eyeIcon"
                @click="changeEyeIcon('old')"
              />
              <eye-invisible-outlined
                v-show="!state.showOldPwd"
                class="password_eyeIcon"
                @click="changeEyeIcon('old')"
              />
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item :label="$t('sys.user.newPassword')" name="newPwd">
            <div class="password_input_container">
              <a-input
                v-model:value="formState.newPwd"
                :maxlength="30"
                :placeholder="$t('sys.action.pleaseInput', { label:$t('sys.user.newPassword')})"
                :type="state.newPwdType"
              />
              <eye-outlined
                v-show="state.showNewPwd"
                class="password_eyeIcon"
                @click="changeEyeIcon('new')"
              />
              <eye-invisible-outlined
                v-show="!state.showNewPwd"
                class="password_eyeIcon"
                @click="changeEyeIcon('new')"
              />
            </div>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item :label="$t('sys.user.confirmPassword')" name="confirmPwd">
            <div class="password_input_container">
              <a-input
                v-model:value="formState.confirmPwd"
                :maxlength="150"
                :placeholder="$t('sys.action.pleaseInput', { label:$t('sys.user.confirmPassword')})"
                :type="state.newPwdConfirmType"
              />
              <eye-outlined
                v-show="state.showNewPwdConfirm"
                class="password_eyeIcon"
                @click="changeEyeIcon('confirm')"
              />
              <eye-invisible-outlined
                v-show="!state.showNewPwdConfirm"
                class="password_eyeIcon"
                @click="changeEyeIcon('confirm')"
              />
            </div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, computed, toRaw } from 'vue'
import { useUserStore } from '@core/store/user'
import { updatePassword } from '@core/api/services/uc'
import { useI18n } from '@core/hooks/useI18n'
import { message } from 'ant-design-vue'
defineOptions({
  name: 'ChangePwdModal'
})
const { t } = useI18n()
const emit = defineEmits(['update:visible', 'callback'])

const formRef = ref()
const formState = reactive({
  oldPwd: undefined,
  newPwd: undefined,
  confirmPwd: undefined
})
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const validPwd = (rule, value) => {
  return new Promise((resolve, reject) => {
    if (value != formState.newPwd) {
      reject(t('sys.user.passwordNotSame'))
    } else {
      resolve(null)
    }
  })
}
const rules = {
  newPwd: [
    { required: true, message: t('sys.action.pleaseInput', { label:t('sys.user.newPassword')}) },
    {
      max: 20,
      message: t('sys.constant.lengthNotMoreThan') + 20,
      trigger: ['blur', 'change']
    }
  ],
  oldPwd: [
    { required: true, message: t('sys.action.pleaseInput', { label:t('sys.user.oldPassword')}) },
    {
      max: 20,
      message: t('sys.constant.lengthNotMoreThan') + 20,
      trigger: ['blur', 'change']
    }
  ],
  confirmPwd: [
    { required: true, validator: validPwd, trigger: 'blur' },
    {
      max: 20,
      message: t('sys.constant.lengthNotMoreThan') + 20,
      trigger: ['blur', 'change']
    }
  ]
}
const state = reactive({
  showOldPwd: false,
  showOldPwdType: 'password',
  showNewPwd: false,
  showNewPwdConfirm: false,
  newPwdType: 'password',
  newPwdConfirmType: 'password'
})
// 获得当前账号
const store = useUserStore()
const userAccount = computed(() => store?.user?.userCode)
// 校验两次密码是否相同

// 切换可视图标
const changeEyeIcon = (params) => {
  if (params === 'new') {
    state.showNewPwd = !state.showNewPwd
    state.newPwdType = state.newPwdType == 'password' ? 'text' : 'password'
  } else if (params == 'old') {
    state.showOldPwd = !state.showOldPwd
    state.showOldPwdType = state.showOldPwdType == 'password' ? 'text' : 'password'
  } else {
    state.showNewPwdConfirm = !state.showNewPwdConfirm
    state.newPwdConfirmType = state.newPwdConfirmType == 'password' ? 'text' : 'password'
  }
}
// 确认
const handleOk = () => {
  formRef.value
    .validateFields()
    .then(async () => {
      const data = {
        oldPassword: formState.oldPwd,
        newPassword: formState.newPwd,
        newPasswordConfirm: formState.confirmPwd
      }
      const ret = await updatePassword(data)
      message.success(t('sys.constant.saveSuccess'))
      handleCancel()
      emit('callback', true)
    })
    .catch((info) => {
      console.log('Validate Failed:', info)
    })
}
// 取消
const handleCancel = () => {
  formRef.value.resetFields()
  formState.oldPwd = undefined
  formState.newPwd = undefined
  formState.oldPwd = undefined

  emit('update:visible', false)
}
// 校验不可输入中文
</script>
<style lang="less" scoped>
.change-password-form {
  margin-top: 16px;
}
.password_input_container {
  position: relative;

  .password_eyeIcon {
    position: absolute;
    top: 50%;
    right: 5%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>
