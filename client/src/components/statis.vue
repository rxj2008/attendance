<template>

  <div class="page-container">
    <h3 class="page-header">
      <el-button type="primary" icon="arrow-left" @click="back">返回</el-button>
      {{year}}年{{month}}月 统计分析

    <el-radio-group class="sortType" v-model="sortType" size="medium" >
      <el-radio label="overtime"  >加班排序</el-radio>
      <el-radio label="leave"  >调休排序</el-radio>
    </el-radio-group>
      <div class="txt">
        总加班： <i class="txt-num total-overtime">{{totalOverTime}}</i> 小时 &emsp;
        人均加班： <i class="txt-num total-overtime">{{ (totalOverTime / usersObj.length).toFixed(1) }}</i> 小时&emsp;
        总调休： <i class="txt-num total-leave">{{totalLeaveTime}}</i> 小时&emsp;
        人均调休：<i class="txt-num total-leave">{{ (totalLeaveTime / usersObj.length).toFixed(1) }}</i> 小时
      </div>


    </h3>
    <div class="list">

      <div id="main" class="chart">

      </div>

    </div>
  </div>
</template>

<script>

  import echarts from 'echarts'

  export default {
    name: 'statis',
  data() {
    return {
      year: this.$store.state.attendance.year,
      month: this.$store.state.attendance.month,
      sortType:'overtime',
      usersObj:[],
      totalOverTime:0,
      totalLeaveTime:0,
    }
  },
  watch:{
    sortType:function(val){
      this.sort();
    }
  },
  mounted() {
    let users=this.$store.state.attendance.list

    users.forEach(user => {
      let totalOvertime=0
      let totalLeavetime=0
      for(let day of user.dates){
        //console.log(''+day.year+'-'+day.month+'-'+day.day)
        //加班时间
        if(day.overtimes && day.overtimes.length>0){
          totalOvertime+=day.overtimes[0].time.totalHours
          //console.log('加班:'+day.overtimes[0].time.totalHours)
        }
        //调休时间
        if(day.leaves && day.leaves.length>0){
          totalLeavetime+=day.leaves[0].time.totalHours
          //console.log('调休:'+day.leaves[0].time.totalHours)
        }
      }
      this.usersObj.push({name:user.name,overtime:totalOvertime,leave:totalLeavetime});
    })

    this.totalOverTime=this.usersObj.map(u=>u.overtime).reduce((p,n)=>p+n);
    this.totalLeaveTime=this.usersObj.map(u=>u.leave).reduce((p,n)=>p+n);
    this.sort();
  },
  methods: {
    back() {
      this.$router.goBack()
    },
    sort(){

      function compare(prop){
        return function(obj1,obj2){
          let value1 = obj1[prop];
          let value2 = obj2[prop];
          return value1 - value2;
        }
      }

      this.usersObj.sort(compare(this.sortType))
      this.initChart()
    },
    initChart(){
      let usersObj=this.usersObj
      var option = {
        color: ['#33aaff', '#ff9933'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['加班', '调休']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          position: 'top',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          axisLabel:{'interval':0},
          splitLine: {show: false},
          data: usersObj.map(u=>u['name'])
        },
        series: [
          {
            name: '加班',
            type: 'bar',
            data: usersObj.map(u=>u['overtime'])
          },
          {
            name: '调休',
            type: 'bar',
            data: usersObj.map(u=>u['leave'])
          }
        ]
      }

      let chart = document.getElementById('main')
      chart.style.height=usersObj.length*20+'px'
      let myChart = echarts.init(chart)

      myChart.setOption(option)
    }
  }

}
</script>
<style lang="scss"  scoped>
  .page-container{
    overflow-y: auto;
  }
  .sortType{
    font-size:14px;
    float:right;
    line-height: 50px;
  }

  .list{
  }

  .chart{
    height: 600px;
    /*border:1px solid #aaa;*/
    /*overflow-y: auto;*/

  }
  .txt{
    display: inline-block;
    padding: 10px 80px 10px 30px;
    font-weight: normal;
    font-size: 14px;
    float: right;

  }
  .txt-num {
    font-weight: bold;
    font-size:20px;
  }
  .total-overtime{
    color:#33aaff;
  }
  .total-leave{
    color:#ff9933;
  }


</style>
