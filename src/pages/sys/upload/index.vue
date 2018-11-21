<template>
  <d2-container>
    <el-form label-position="top"
             style="margin-left:50px"
             label-width="80px"
             model="top">
      <el-form-item label="结果">
        <el-input :rows="10"
                  v-model="uploadFileListStr"
                  type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="上传">
        <el-upload class="upload-file"
                   drag
                   :on-success='uploadSuccessHandle'
                   :headers='headers'
                   action="/oss/upload"
                   multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
    </el-form>
  </d2-container>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'upload',
  data () {
    return {
      // 上传列表
      uploadFileListStr: ''
    }
  },
  computed: {
    headers: function () {
      return { 'accessToken': util.cookies.get('accessToken') }
    }
  },
  methods: {
    uploadSuccessHandle (response, file, fileList) {
      this.uploadFileListStr = this.uploadFileListStr.concat('\n').concat(file.name).concat('\t').concat(response.data).trim();
      console.log(this.uploadFileListStr)
    }
  }

}
</script>

<style>
</style>
