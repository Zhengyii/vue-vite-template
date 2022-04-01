<template>
  <div class="loginWrapper">
    <div class="header">
      <div class="logo"></div>
      <span>浙江省自然资源网上交易数据分析</span>
    </div>
    <div class="login">
      <div class="login_form">
        <p style="margin-bottom: 56px">安全登录</p>

        <a-form :model="formState" autocomplete="off" hideRequiredMark @finish="onFinish">
          <a-form-item
            name="account"
            :rules="[{ required: true, message: '请输入账号' }]"
          >
            <a-input
              class="login_formItem"
              placeholder="请输入账号"
              size="large"
              v-model:value="formState.account"
            >
              <template #prefix>
                <icon-font type="icon-user"></icon-font>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入密码' }]"
          >
            <a-input
              class="login_formItem"
              placeholder="请输入密码"
              size="large"
              v-model:value="formState.password"
            >
              <template #prefix>
                <icon-font type="icon-password1"></icon-font>
              </template>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-button
              style="margin-top: 36px"
              size="large"
              block
              type="primary"
              html-type="submit"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      formState: {
        account: '',
        password: ''
      }
    }
  },
  created() {
    // console.log('1111', import.meta.env.MODE)
  },
  methods: {
    onFinish(values) {
      const params = {
        name: values.account,
        password: values.password
      }
      this.$api.user.login(params).then((res, reject) => {
        const url = `https://workspace.easyv.cloud/shareScreen/eyJzY3JlZW5JZCI6ODcxNTA4fQ==?token=${res.token}`
        this.$message.success('登录成功')
        window.open(url, '_blank')
      })
    }
  }
})
</script>


<style lang="less" scoped>
.loginWrapper {
  width: 100%;
  padding: 34px 0px 34px 66px;
  position: relative;
  .header {
    .logo {
      display: inline-block;
      width: 56px;
      height: 56px;
      background: url('../../assets/logo.png');
      background-size: cover;
      vertical-align: middle;
      margin-right: 14px;
    }
    span {
      font-weight: 600;
      font-size: 32px;
      line-height: 45px;
      color: #ffffff;
      vertical-align: middle;
    }
  }

  .login {
    &_form {
      width: 380px;
      height: 420px;
      background: #192434;
      border-radius: 4px;
      border: 2px solid #25b5d1;
      padding: 45px 40px;
      position: absolute;
      top: calc(50vh - 200px);
      right: calc(50vw - 620px);

      p {
        font-weight: 500;
        font-size: 22px;
        line-height: 32px;
        color: #ffffff;
        text-align: center;
      }
    }

    &_formItem {
      width: 298px;
      background-color: #252e3d !important;
      /deep/ .ant-input {
        background-color: #252e3d !important;
        color: #ffffff !important;
        font-weight: 400 !important;
        font-size: 16px !important;
        border: 1px solid #252e3d !important;
      }
      /deep/ .ant-input-prefix {
        color: #979797 !important;
      }
    }
  }
}
</style>
