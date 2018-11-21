<template>
  <div>
    <a class="btn"
       @click="toggleShow">set avatar</a>
    <avatar-upload field="file"
                   @crop-success="cropSuccess"
                   @crop-upload-success="cropUploadSuccess"
                   @crop-upload-fail="cropUploadFail"
                   v-model="show"
                   :width="300"
                   :height="300"
                   url="/oss/upload"
                   :headers="headers"
                   img-format="png">
    </avatar-upload>
    <img :src="imgDataUrl">
  </div>
</template>

<script>
import util from '@/libs/util'
import 'babel-polyfill'; // es6 shim
import avatarUpload from 'vue-image-crop-upload';
export default {
  name: 'demo',
  data () {
    return {
      show: false,
      headers: {
        accessToken: util.cookies.get('accessToken')
      }
    }
  },
  components: {
    'avatar-upload': avatarUpload
  },
  methods: {
    cropSuccess (imgDataUrl, field) {
      console.log('-------- crop success --------');
      this.imgDataUrl = imgDataUrl;
    },
    cropUploadSuccess (jsonData, field) {
      console.log('-------- upload success --------');
      console.log(jsonData);
      console.log('field: ' + field);
    },
    cropUploadFail (status, field) {
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    },
    toggleShow () {
      this.show = !this.show;
    }
  }
}
</script>

<style>
</style>
