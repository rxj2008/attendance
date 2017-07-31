<template>
  <div class="page-container">
    <h3 class="page-header">
      考勤月份：
      <el-date-picker v-model="date" type="month" placeholder="选择月" format="yyyy-MM" @change="dateChange">
      </el-date-picker>
    </h3>
    <div class="upload">
      <div class="el-upload-dragger" @dragover="dragoverHandle" @dragleave="dragleaveHandle" @drop="dragHandle">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em @click="selectFile()">点击上传</em>
        </div>
      </div>
      <input id="sheet" type="file" name="file" multiple="multiple" class="el-upload__input" @change="fileChange">
    </div>
  </div>
</template>

<script>
import calendar from './common/calendar.vue'
import { analysis } from '../assets/js'
export default {
  name: 'upload',
  data() {
    return {
      year: 0,
      month: 0
    }
  },
  computed: {
    date: {
      get() { return new Date(this.year, this.month - 1, 3) },
      set(value) {
        this.year = value.getFullYear()
        this.month = value.getMonth() + 1
      }
    }
  },
  methods: {
    dateChange(text) {
      console.log(text)
      console.log(this.date)
    },
    selectFile() {
      document.querySelector('#sheet').click()
    },
    fileChange(event) {
      let files = event.target.files
      if (!files || !files.length) return
      this.analysisFile(files[0])
    },
    analysisFile(file) {
      // 提取文件中的月份
      let monthRegex = /(\d+)月/
      if (monthRegex.test(file.name)) {
        let month = +RegExp.$1
        if (this.month !== month) {
          this.month = month
        }
      }
      analysis(file, this.year, this.month).then(() => {
        this.$router.push({name: 'list'})
        // document.querySelector('#sheet').value = ''
      })
    },
    dragoverHandle(event) {
      let oEvent = event || window.event
      oEvent.preventDefault()
    },
    dragleaveHandle(event) {
      let oEvent = event || window.event
      oEvent.preventDefault()
    },
    dragHandle(event) {
      let oEvent = event || window.event
      let files = oEvent.dataTransfer.files
      if (!files || !files.length) return
      this.analysisFile(files[0])
      oEvent.preventDefault()
    }
  },
  mounted() {
    this.date = new Date()
  },
  components: { calendar }
}
</script>

<style lang="scss" scoped >
.page-header {
  text-align: center;
}

.upload {
  height: 250px;
}

.el-upload-dragger {
  width: 100%;
  height: 100%;
}
</style>


