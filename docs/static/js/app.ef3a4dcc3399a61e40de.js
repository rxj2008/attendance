webpackJsonp([1],{203:function(e,t,n){function a(e){n(341)}var r=n(12)(n(235),n(361),a,"data-v-544f59cc",null);e.exports=r.exports},205:function(e,t){},206:function(e,t,n){"use strict";n(252)},207:function(e,t,n){"use strict";function a(e,t,n){i.a.state.attendance.list&&i.a.state.attendance.list.length?n():n({name:"upload"})}var r=n(4),s=n(369),i=n(36),o=n(358),u=n.n(o),c=n(357),l=n.n(c),d=n(360),f=n.n(d),h=n(359),m=n.n(h),v=n(356),p=n.n(v);r.default.use(s.a),t.a=new s.a({routes:[{path:"/",name:"layout",component:u.a,children:[{path:"index",name:"index",component:l.a},{path:"upload",name:"upload",component:f.a},{path:"list",name:"list",component:m.a,beforeEnter:a},{path:"detail/:name",name:"detail",component:p.a,beforeEnter:a}]}]})},209:function(e,t){},210:function(e,t){},211:function(e,t,n){function a(e){n(342)}var r=n(12)(n(234),n(362),a,null,null);e.exports=r.exports},234:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app"}},235:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(66),r=n.n(a),s=n(18),i=n.n(s),o=n(64),u=n.n(o),c=n(7);t.default={name:"calendar",props:{initDate:{type:Date,default:function(){return new Date}}},data:function(){return{year:0,month:0,currDate:null,dates:[],weekNames:c.a.getWeekName()}},computed:{weeks:function(){for(var e=[],t=0;t<6;t++)e.push(this.dates.slice(7*t,7*(t+1)));return e}},methods:{dateChange:function(){var e=c.a.convertDate(this.initDate);this.year=e.year,this.month=e.month,this.getDates()},getDates:function(){var e=this;return u()(r.a.mark(function t(){var n,a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={justify:!0},e.dates=c.a.getDates(e.year,e.month,n),t.next=4,e.$store.dispatch("getCalender",{start:e.dates[0],end:e.dates[e.dates.length-1]});case 4:a=t.sent,a.forEach(function(t){var n=e.dates.find(function(e){return e.id===t.id});i()(n,t)});case 6:case"end":return t.stop()}},t,e)}))()},className:function(e){return{"date-gap":e.month!==this.month,weekend:e.isWeekend,holiday:!e.isWeekend&&!e.isWorkday,workday:e.isWeekend&&e.isWorkday,current:e===this.currDate}},clickDate:function(){}},mounted:function(){this.dateChange()},watch:{initDate:function(e){this.dateChange()}}}},236:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{active:"",isHome:!1,headerStyle:{}}},watch:{"$route.path":{immediate:!0,handler:function(){this.isHome=/^home/.test(this.$route.name),this.headerStyle.backgroundColor="rgba(32, 160, 255, "+(this.isHome?"0":"1")+")"}}},methods:{switchLang:function(e){this.lang!==e&&(localStorage.setItem("ELEMENT_LANGUAGE",e),this.$router.push(this.$route.path.replace(this.lang,e)))}},mounted:function(){var e=this;!function(e){window.addEventListener("scroll",function(){e()},!1)}(function(){if(e.isHome){var t=Math.min(document.documentElement.scrollTop||document.body.scrollTop,200)/200;e.$refs.header.style.backgroundColor="rgba(32, 160, 255, "+t+")"}})}}},237:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={name:"details",data:function(){return{name:"",year:this.$store.state.attendance.year,month:this.$store.state.attendance.month,allAttendances:[],attendances:[],types:[{label:"全部",value:15},{label:"加班",value:1},{label:"请假",value:2},{label:"报销",value:4},{label:"打卡异常",value:8}],type:15,columns:{overtime:!0,leave:!0,reimburse:!0,exception:!0}}},methods:{init:function(e){var t=this;this.name=e.params.name;var n=this.$store.state.attendance.list.find(function(e){return e.name===t.name});this.allAttendances=n?n.dates:[]},query:function(){switch(this.setColumns(this.type),this.type){case 1:this.attendances=this.allAttendances.filter(function(e){return e.overtimes.length});break;case 2:this.attendances=this.allAttendances.filter(function(e){return e.leaves.length});break;case 4:this.attendances=this.allAttendances.filter(function(e){return e.reimburses.length});break;case 8:this.attendances=this.allAttendances.filter(function(e){return e.exception});break;default:this.attendances=this.allAttendances}},setColumns:function(e){e||(e=15),this.columns.overtime=!!(1&e),this.columns.leave=!!(2&e),this.columns.reimburse=!!(4&e),this.columns.exception=!!(8&e)},getSummaries:function(e){var t=e.columns,n=e.data,a={leave:0,overtime:0,reimburse:0};return n.forEach(function(e){e.leaves.forEach(function(e){a.leave+=e.time.totalHours}),e.overtimes.forEach(function(e){a.overtime+=e.time.totalHours}),e.reimburses.forEach(function(e){a.reimburse+=e.money})}),t.map(function(e){switch(e.label){case"日期":return"合计";case"请假":return a.leave;case"加班":return a.overtime;case"报销":return a.reimburse;default:return"N/A"}})},setRowClass:function(e){return e.isWorkday?"":"background:rgba(29, 144, 230, 0.50);"}},mounted:function(){this.init(this.$route),this.query()}}},238:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(203),r=n.n(a);t.default={name:"index",data:function(){return{date:new Date}},methods:{dateChange:function(e){console.log(e),console.log(this.date)}},components:{calendar:r.a}}},239:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(355),r=n.n(a);t.default={data:function(){return{activeIndex:"1"}},methods:{handleSelect:function(e,t){}},components:{navHeader:r.a}}},240:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(66),r=n.n(a),s=n(18),i=n.n(s),o=n(64),u=n.n(o),c=n(7);t.default={name:"list",data:function(){return{year:this.$store.state.attendance.year,month:this.$store.state.attendance.month,attendances:this.$store.state.attendance.list,dates:[]}},methods:{init:function(){var e=this;return u()(r.a.mark(function t(){var n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.dates=c.a.getDates(e.year,e.month),t.next=3,e.$store.dispatch("getCalender",{start:e.dates[0],end:e.dates[e.dates.length-1]});case 3:n=t.sent,n.forEach(function(t){var n=e.dates.find(function(e){return e.id===t.id});i()(n,t)});case 5:case"end":return t.stop()}},t,e)}))()},createExcel:function(){n.i(c.b)(this.attendances)}},mounted:function(){this.init()}}},241:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(203),r=n.n(a),s=n(7);t.default={name:"upload",data:function(){return{year:0,month:0,dragoverStyle:!1}},computed:{date:{get:function(){return new Date(this.year,this.month-1,3)},set:function(e){this.year=e.getFullYear(),this.month=e.getMonth()+1}}},methods:{dateChange:function(e){console.log(e),console.log(this.date)},selectFile:function(){document.querySelector("#sheet").click()},fileChange:function(e){var t=e.target.files;t&&t.length&&this.analysisFile(t[0])},analysisFile:function(e){var t=this;if(/(\d+)月/.test(e.name)){var a=+RegExp.$1;this.month!==a&&(this.month=a)}n.i(s.j)(e,this.year,this.month).then(function(){t.$router.push({name:"list"})})},dragoverHandle:function(e){(e||window.event).preventDefault(),this.dragoverStyle=!0},dragleaveHandle:function(e){(e||window.event).preventDefault(),this.dragoverStyle=!1},dragHandle:function(e){var t=e||window.event,n=t.dataTransfer.files;n&&n.length&&(this.analysisFile(n[0]),t.preventDefault())}},mounted:function(){this.date=new Date},components:{calendar:r.a}}},242:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var a=n(7),r={startTime:{earliest:new a.d(8,30),latest:new a.d(9,0)},endTime:{earliest:new a.d(18,0),latest:new a.d(18,30)},workingTime:480,lunchBreak:{start:new a.d(12,0),end:new a.d(13,30),time:90},flexTime:60,overtime:{min:60,step:30,includeWorkday:!0},leave:{min:60,step:60,includeWorkday:!0}}},243:function(e,t,n){"use strict";n.d(t,"b",function(){return v}),n.d(t,"c",function(){return p}),n.d(t,"a",function(){return y});var a=n(262),r=n.n(a),s=n(269),i=n.n(s),o=n(268),u=n.n(o),c=n(38),l=n.n(c),d=n(39),f=n.n(d),h=n(7),m=function(){function e(t,n){l()(this,e),this.startTime=t,this.endTime=n,this.time=n.subtract(t),t<=h.c.lunchBreak.start&&n>=h.c.lunchBreak.end&&(this.time=this.time.subtract(h.c.lunchBreak.time))}return f()(e,[{key:"toString",value:function(){return this.startTime.toString()+"--"+this.endTime.toString()+"|"+this.time.totalHours}}]),e}(),v=function(e){function t(e,n){l()(this,t);var a=i()(this,(t.__proto__||r()(t)).call(this,e,n)),s=Math.max(a.time.totalMinutes,h.c.leave.min),o=Math.ceil((s-h.c.leave.min)/h.c.leave.step),u=o*h.c.leave.step+h.c.leave.min;return a.time=new h.d(u),a}return u()(t,e),t}(m),p=function(e){function t(e,n){l()(this,t);var a=i()(this,(t.__proto__||r()(t)).call(this,e,n)),s=Math.floor((a.time.totalMinutes-h.c.overtime.min)/h.c.overtime.step),o=s*h.c.overtime.step+h.c.overtime.min;return a.time=new h.d(o),a}return u()(t,e),t}(m),y=function(){function e(t,n,a){l()(this,e),this.money=t,this.type=n,this.times=a}return f()(e,[{key:"toString",value:function(){var e=this.times.map(function(e){return e.toString()}).join("/");return this.type+"|"+this.money+"|"+e}}]),e}()},244:function(e,t,n){"use strict";function a(e,t){if(f=null,h=null,1===e.clocktimes.length)e.exception=!0,e.message="只有一次打卡记录";else if(e.clocktimes.length>=2){if(f=e.clocktimes[0],(h=e.clocktimes[e.clocktimes.length-1])<=t.startTime.earliest)return e.exception=!0,void(e.message="打卡异常");if(f>=t.endTime.earliest)return e.exception=!0,void(e.message="打卡异常");f<t.startTime.earliest?f=new d.d(t.startTime.earliest):f<t.lunchBreak.end&&f>=t.lunchBreak.start&&(f=new d.d(t.lunchBreak.end)),h<=t.lunchBreak.end&&h>t.lunchBreak.start&&(h=new d.d(t.lunchBreak.start))}}function r(e,t){if(f&&h){var n=h.subtract(f);f<=t.lunchBreak.start&&h>=t.lunchBreak.end&&(n=n.subtract(t.lunchBreak.time)),e.workingTime=n}}function s(e,t){if(f&&h&&f>=t.startTime.earliest&&f<=t.startTime.latest){var n=f.add(t.workingTime).add(t.lunchBreak.time);e.workingTime>=t.workingTime+t.overtime.min?e.overtimes.push(new d.f(n,h)):e.workingTime<t.workingTime&&e.leaves.push(new d.g(h,n))}}function i(e,t){if(f&&h&&f>t.startTime.latest)if(h>=t.endTime.earliest&&h<=t.endTime.latest){var n=h.subtract(t.workingTime).subtract(t.lunchBreak.time);e.leaves.push(new d.g(n,f))}else if(h>t.endTime.latest)if(e.workingTime>=t.workingTime){var a=(f.subtract(t.startTime.earliest).totalMinutes-t.leave.min)/t.leave.step,r=(f.subtract(t.startTime.latest).totalMinutes-t.leave.min)/t.leave.step,s=t.startTime.earliest;r>0&&Math.ceil(a)>Math.ceil(r)&&(s=t.startTime.latest),e.leaves.push(new d.g(s,f)),e.overtimes.push(new d.f(s.add(t.workingTime).add(t.lunchBreak.time),h))}else e.leaves.push(new d.g(t.startTime.latest,f));else{var i=f.subtract(t.startTime.earliest);f>=t.lunchBreak.end&&i.subtract(t.lunchBreak.time);var o=t.startTime.earliest.add(i.minutes),u=o.add(t.workingTime).add(t.lunchBreak.time);e.leaves.push(new d.g(o,f)),h<u?e.leaves.push(new d.g(h,u)):h.subtract(u)>=t.overtime.min&&e.overtimes.push(new d.f(u,h))}}function o(e,t){f||h?(s(e,t),i(e,t)):e.leaves.push(new d.g(t.startTime.earliest,t.endTime.earliest))}function u(e,t){f&&h&&e.workingTime>=t.overtime.min&&e.overtimes.push(new d.f(f,h))}var c=n(18),l=n.n(c),d=n(7),f=void 0,h=void 0;t.a=function(e){return l()(e,{leaves:[],overtimes:[]}),a(e,d.c),e.exception||(r(e,d.c),e.isWorkday?o(e,d.c):u(e,d.c)),e}},245:function(e,t,n){"use strict";var a=n(7),r=/(\d+):(\d+)/;t.a=function(e){if(e.clocktimes=[],!e.originalValue)return e;var t=e.originalValue.split(/\s+/);return t.length&&(t=t.filter(function(e,n){return!n||e!==t[n-1]}),e.clocktimes=t.map(function(e){if(r.test(e))return new a.d(+RegExp.$1,+RegExp.$2)})),e}},246:function(e,t,n){"use strict";function a(e){e.isWorkday?i<=s.c.startTime.latest&&o>=new s.d(20,0)&&e.reimburses.push(new s.e(20,"餐费",[new s.d(20,0)])):e.workingTime>=new s.d(8,0)?e.reimburses.push(new s.e(40,"餐费",[new s.d(12,0)])):e.workingTime>=new s.d(6,0)&&e.reimburses.push(new s.e(20,"餐费",[new s.d(12,0)]))}function r(e){i<=s.c.startTime.latest&&o>=new s.d(22,0)&&e.reimburses.push(new s.e(0,"交通费",[new s.d(22,0)]))}var s=n(7),i=void 0,o=void 0;t.a=function(e){return e.reimburses=[],e.clocktimes&&e.clocktimes.length>=2&&(i=e.clocktimes[0],o=e.clocktimes[e.clocktimes.length-1],a(e),r(e)),e}},247:function(e,t,n){"use strict";function a(e){return f.run(e)}t.a=a;var r=n(38),s=n.n(r),i=n(39),o=n.n(i),u=n(245),c=n(244),l=n(246),d=function(){function e(){s()(this,e),this.plugins=[]}return o()(e,[{key:"register",value:function(e,t){this.plugins.push({name:e,plugin:t})}},{key:"run",value:function(e,t){var n=e;return this.plugins.forEach(function(t){var a=t.plugin;n=a(e)}),n}}]),e}(),f=new d;f.register("preproccess",u.a),f.register("overtime",c.a),f.register("reimburse",l.a)},248:function(e,t,n){"use strict";function a(e,t,a){var s=p.a.getDates(t,a),i=v.a.dispatch("getCalender",{start:s[0],end:s[s.length-1]}),o=p.h.sheetToJson(e);return m.a.all([i,o]).then(function(e){var i=f()(e,2),o=i[0],c=i[1];o.forEach(function(e){var t=s.find(function(t){return t.id===e.id});l()(t,e)});var d=r(c,s);return d.forEach(function(e){e.dates.forEach(function(e){try{n.i(p.i)(e)}catch(e){console.log(u()(e))}})}),v.a.dispatch("saveAttendance",{year:t,month:a,list:d}),d})}function r(e,t){return e.filter(function(e){return e["姓名"]}).map(function(e){return{name:e["姓名"],id:e["姓名"]+"-"+t[0].moment.format("YYYYMM"),dates:t.map(function(t){var n=t.month+"-"+t.date;return i()({},t,{originalValue:(e[n]||"").trim()})})}})}t.a=a;var s=n(267),i=n.n(s),o=n(259),u=n.n(o),c=n(18),l=n.n(c),d=n(270),f=n.n(d),h=n(27),m=n.n(h),v=n(36),p=n(7)},249:function(e,t,n){"use strict";function a(e){e=l()(e);var t=e.day();return{year:e.year(),month:e.month()+1,date:e.date(),day:t,isWeekend:0===t||6===t,isWorkday:t>0&&t<6,moment:l()(e),id:+e.format("YYYYMMDD")}}function r(e,t,n){n=u()({justify:!1},n);var r=[],s=l()([e,t-1]);if(n.justify){var i=s.day();s=s.subtract(i,"days")}for(var o=0;o<42;o++){var c=a(s);if(!n.justify&&c.month!==t)break;r.push(c),s.add(1,"days")}return r}function s(){return a(l()())}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return d.map(function(t,n){return d[(n+e)%7]})}n.d(t,"a",function(){return f});var o=n(18),u=n.n(o),c=n(0),l=n.n(c),d=[{name:"星期日",isWorkday:!1,index:0},{name:"星期一",isWorkday:!0,index:1},{name:"星期二",isWorkday:!0,index:2},{name:"星期三",isWorkday:!0,index:3},{name:"星期四",isWorkday:!0,index:4},{name:"星期五",isWorkday:!0,index:5},{name:"星期六",isWorkday:!1,index:6}],f={now:s,getDates:r,convertDate:a,getWeekName:i}},250:function(e,t,n){"use strict";function a(e){var t=[],n={name:"加班",data:[["序号","姓名","年/月/日","时","分","年/月/日","时","分","总时长","事由","本人手签"]]},a=1,s={name:"调休",data:[["序号","姓名","年/月/日","时","分","年/月/日","时","分","总时长","事由","本人手签"]]},i=1,o={name:"报销",data:[["序号","所属分公司","姓名","报销日期","金额","票据发生类别","票据发生时间","出发地—目的地","客户公司名称","客户姓名及电话","备注说明"]]},u=1;e.forEach(function(e){e.dates.forEach(function(t){t.overtimes.length&&t.overtimes.forEach(function(r){var s=[];s.push(a++),s.push(e.name),s.push(t.year+"年"+t.month+"月"+t.date+"日"),s.push(r.startTime.hours),s.push(r.startTime.minutes),s.push(t.year+"年"+t.month+"月"+t.date+"日"),s.push(r.endTime.hours),s.push(r.endTime.minutes),s.push(r.time.value/60),s.push(""),s.push(""),n.data.push(s)}),t.leaves.length&&t.leaves.forEach(function(n){var a=[];a.push(i++),a.push(e.name),a.push(t.year+"年"+t.month+"月"+t.date+"日"),a.push(n.startTime.hours),a.push(n.startTime.minutes),a.push(t.year+"年"+t.month+"月"+t.date+"日"),a.push(n.endTime.hours),a.push(n.endTime.minutes),a.push(n.time.value/60),a.push("调休"),a.push(""),s.data.push(a)}),t.reimburses.length&&t.reimburses.forEach(function(n){var a=[];a.push(u++),a.push("九次方"),a.push(e.name),a.push(t.year+"/"+t.month+"/"+t.date),a.push(n.money),a.push(n.type),a.push(n.times.map(function(e){return e.hours+":"+e.minutes}).join("/")),a.push(""),a.push(""),a.push(""),a.push(t.isWeekend?"周末加班":""),o.data.push(a)})})}),t.push(n),t.push(s),t.push(o),r.a.export("考勤",t)}t.a=a;var r=n(62)},251:function(e,t,n){"use strict";n.d(t,"a",function(){return c});var a=n(260),r=n.n(a),s=n(38),i=n.n(s),o=n(39),u=n.n(o),c=function(){function e(t,n){i()(this,e),1===arguments.length?this.totalMinutes=arguments[0].valueOf():this.totalMinutes=60*t+n}return u()(e,[{key:"valueOf",value:function(){return this.value}},{key:"toString",value:function(){var e=this.hours,t=this.minutes;return e<10&&(e="0"+e),t<10&&(t="0"+t),e+":"+t}},{key:"add",value:function(t){var n=t.valueOf();if(r()(n))return new e(0,this.totalMinutes+n)}},{key:"subtract",value:function(t){var n=t.valueOf();if(r()(n))return new e(0,this.totalMinutes-n)}},{key:"totalHours",get:function(){return this.totalMinutes/60}},{key:"totalMinutes",get:function(){return this.value},set:function(e){this.hours=Math.floor(e/60),this.minutes=e%60,this.value=e}}]),e}()},252:function(e,t,n){"use strict";n(4).default.filter("padLeft",function(e,t){var n=(""+e).length;return Array(Math.max(0,t-n+1)).join(0)+e})},253:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(4),r=n(211),s=n.n(r),i=n(207),o=n(36),u=n(208),c=n.n(u),l=(n(206),n(209)),d=(n.n(l),n(210));n.n(d);a.default.config.productionTip=!1,a.default.use(c.a),new a.default({el:"#app",router:i.a,store:o.a,template:"<App/>",components:{App:s.a}})},254:function(e,t,n){"use strict";var a=n(266),r=n.n(a),s=n(27),i=n.n(s),o=n(256),u={list:[],year:0,month:0},c={attendances:function(e){return e.list}},l={getAttendance:function(e,t){var n=(e.commit,e.state);if(!n.list)return[];var a=t.name,r=t.year,s=t.month,o=a+"-"+r+(s<10?"0"+s:s),u=n.list.find(function(e){return e.id===o});return i.a.resolve(u)},saveAttendance:function(e,t){(0,e.commit)(o.a,t)}},d=r()({},o.a,function(e,t){e.list=t.list,e.year=t.year,e.month=t.month});t.a={state:u,getters:c,actions:l,mutations:d}},255:function(e,t,n){"use strict";var a=n(377),r={getCalender:function(e,t){var n=(e.commit,t.start),r=t.end;return a.a.filter(function(e){return e.id>=n.id&&e.id<=r.id})}};t.a={actions:r}},256:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a="ATTENDANCE_SET"},341:function(e,t){},342:function(e,t){},343:function(e,t){},344:function(e,t){},345:function(e,t){},346:function(e,t){},347:function(e,t){},348:function(e,t){},351:function(e,t,n){function a(e){return n(r(e))}function r(e){var t=s[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var s={"./af":87,"./af.js":87,"./ar":94,"./ar-dz":88,"./ar-dz.js":88,"./ar-kw":89,"./ar-kw.js":89,"./ar-ly":90,"./ar-ly.js":90,"./ar-ma":91,"./ar-ma.js":91,"./ar-sa":92,"./ar-sa.js":92,"./ar-tn":93,"./ar-tn.js":93,"./ar.js":94,"./az":95,"./az.js":95,"./be":96,"./be.js":96,"./bg":97,"./bg.js":97,"./bn":98,"./bn.js":98,"./bo":99,"./bo.js":99,"./br":100,"./br.js":100,"./bs":101,"./bs.js":101,"./ca":102,"./ca.js":102,"./cs":103,"./cs.js":103,"./cv":104,"./cv.js":104,"./cy":105,"./cy.js":105,"./da":106,"./da.js":106,"./de":109,"./de-at":107,"./de-at.js":107,"./de-ch":108,"./de-ch.js":108,"./de.js":109,"./dv":110,"./dv.js":110,"./el":111,"./el.js":111,"./en-au":112,"./en-au.js":112,"./en-ca":113,"./en-ca.js":113,"./en-gb":114,"./en-gb.js":114,"./en-ie":115,"./en-ie.js":115,"./en-nz":116,"./en-nz.js":116,"./eo":117,"./eo.js":117,"./es":119,"./es-do":118,"./es-do.js":118,"./es.js":119,"./et":120,"./et.js":120,"./eu":121,"./eu.js":121,"./fa":122,"./fa.js":122,"./fi":123,"./fi.js":123,"./fo":124,"./fo.js":124,"./fr":127,"./fr-ca":125,"./fr-ca.js":125,"./fr-ch":126,"./fr-ch.js":126,"./fr.js":127,"./fy":128,"./fy.js":128,"./gd":129,"./gd.js":129,"./gl":130,"./gl.js":130,"./gom-latn":131,"./gom-latn.js":131,"./he":132,"./he.js":132,"./hi":133,"./hi.js":133,"./hr":134,"./hr.js":134,"./hu":135,"./hu.js":135,"./hy-am":136,"./hy-am.js":136,"./id":137,"./id.js":137,"./is":138,"./is.js":138,"./it":139,"./it.js":139,"./ja":140,"./ja.js":140,"./jv":141,"./jv.js":141,"./ka":142,"./ka.js":142,"./kk":143,"./kk.js":143,"./km":144,"./km.js":144,"./kn":145,"./kn.js":145,"./ko":146,"./ko.js":146,"./ky":147,"./ky.js":147,"./lb":148,"./lb.js":148,"./lo":149,"./lo.js":149,"./lt":150,"./lt.js":150,"./lv":151,"./lv.js":151,"./me":152,"./me.js":152,"./mi":153,"./mi.js":153,"./mk":154,"./mk.js":154,"./ml":155,"./ml.js":155,"./mr":156,"./mr.js":156,"./ms":158,"./ms-my":157,"./ms-my.js":157,"./ms.js":158,"./my":159,"./my.js":159,"./nb":160,"./nb.js":160,"./ne":161,"./ne.js":161,"./nl":163,"./nl-be":162,"./nl-be.js":162,"./nl.js":163,"./nn":164,"./nn.js":164,"./pa-in":165,"./pa-in.js":165,"./pl":166,"./pl.js":166,"./pt":168,"./pt-br":167,"./pt-br.js":167,"./pt.js":168,"./ro":169,"./ro.js":169,"./ru":170,"./ru.js":170,"./sd":171,"./sd.js":171,"./se":172,"./se.js":172,"./si":173,"./si.js":173,"./sk":174,"./sk.js":174,"./sl":175,"./sl.js":175,"./sq":176,"./sq.js":176,"./sr":178,"./sr-cyrl":177,"./sr-cyrl.js":177,"./sr.js":178,"./ss":179,"./ss.js":179,"./sv":180,"./sv.js":180,"./sw":181,"./sw.js":181,"./ta":182,"./ta.js":182,"./te":183,"./te.js":183,"./tet":184,"./tet.js":184,"./th":185,"./th.js":185,"./tl-ph":186,"./tl-ph.js":186,"./tlh":187,"./tlh.js":187,"./tr":188,"./tr.js":188,"./tzl":189,"./tzl.js":189,"./tzm":191,"./tzm-latn":190,"./tzm-latn.js":190,"./tzm.js":191,"./uk":192,"./uk.js":192,"./ur":193,"./ur.js":193,"./uz":195,"./uz-latn":194,"./uz-latn.js":194,"./uz.js":195,"./vi":196,"./vi.js":196,"./x-pseudo":197,"./x-pseudo.js":197,"./yo":198,"./yo.js":198,"./zh-cn":199,"./zh-cn.js":199,"./zh-hk":200,"./zh-hk.js":200,"./zh-tw":201,"./zh-tw.js":201};a.keys=function(){return Object.keys(s)},a.resolve=r,e.exports=a,a.id=351},355:function(e,t,n){function a(e){n(347)}var r=n(12)(n(236),n(367),a,"data-v-90d7882e",null);e.exports=r.exports},356:function(e,t,n){function a(e){n(345)}var r=n(12)(n(237),n(365),a,"data-v-73078fc9",null);e.exports=r.exports},357:function(e,t,n){function a(e){n(343)}var r=n(12)(n(238),n(363),a,"data-v-6580bdec",null);e.exports=r.exports},358:function(e,t,n){function a(e){n(346)}var r=n(12)(n(239),n(366),a,"data-v-75ad43bc",null);e.exports=r.exports},359:function(e,t,n){function a(e){n(344)}var r=n(12)(n(240),n(364),a,"data-v-71171196",null);e.exports=r.exports},36:function(e,t,n){"use strict";var a=n(4),r=n(371),s=n(255),i=n(254);a.default.use(r.a),t.a=new r.a.Store({modules:{calendar:s.a,attendance:i.a}})},360:function(e,t,n){function a(e){n(348)}var r=n(12)(n(241),n(368),a,"data-v-bb61a50e",null);e.exports=r.exports},361:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("table",{staticClass:"table table-bordered table-fixed table-calendar"},[n("thead",[n("tr",e._l(e.weekNames,function(t){return n("th",{key:t.name},[e._v("\n        "+e._s(t.name)+"\n      ")])}))]),e._v(" "),n("tbody",e._l(e.weeks,function(t,a){return n("tr",{key:a},e._l(t,function(t){return n("td",{key:t.date,class:e.className(t),attrs:{"data-date":t.date},on:{click:function(n){e.clickDate(t)}}},[e._t("default",null,{date:t})],2)}))}))])},staticRenderFns:[]}},362:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("router-view")},staticRenderFns:[]}},363:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page-container"},[n("h3",{staticClass:"page-header"},[n("el-date-picker",{attrs:{type:"month",placeholder:"选择月",format:"yyyy-MM"},on:{change:e.dateChange},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),e._v(" "),n("calendar",{staticClass:"calendar",attrs:{initDate:e.date}})],1)},staticRenderFns:[]}},364:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page-container"},[n("h3",{staticClass:"page-header fl"},[e._v("\n    "+e._s(e.year)+"年"+e._s(e.month)+"月 打卡记录表\n  ")]),e._v(" "),n("el-button",{staticClass:"fr",on:{click:e.createExcel}},[e._v("生成Excel表")]),e._v(" "),n("div",{staticClass:"list"},[n("el-table",{attrs:{data:e.attendances,border:"",stripe:"",height:"el-table"}},[n("el-table-column",{attrs:{prop:"name",fixed:"",label:"姓名",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("router-link",{attrs:{to:{name:"detail",params:{name:t.row.name}}}},[e._v(e._s(t.row.name))])]}}])}),e._v(" "),e._l(e.dates,function(t,a){return n("el-table-column",{key:t.date,attrs:{label:t.month+"-"+t.date},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.dates[a].clocktimes,function(r,s){return n("span",{key:r.valueOf(),staticClass:"item"},[0===s||s===t.row.dates[a].clocktimes.length-1?[e._v("\n            "+e._s(r.toString())+"\n            ")]:e._e()],2)})}}])})})],2)],1)],1)},staticRenderFns:[]}},365:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page-container"},[n("h3",{staticClass:"page-header"},[e._v("\n    "+e._s(e.name)+"-"+e._s(e.year)+"年"+e._s(e.month)+"月 考勤\n    "),n("el-select",{staticClass:"type-select",attrs:{clearable:"",size:"small",placeholder:"请选择"},on:{change:e.query},model:{value:e.type,callback:function(t){e.type=t},expression:"type"}},e._l(e.types,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),n("div",{staticClass:"list"},[n("el-table",{attrs:{data:e.attendances,"sum-text":"合计","summary-method":e.getSummaries,"show-summary":"",border:"",fit:"",height:"el-table","row-style":e.setRowClass}},[n("el-table-column",{attrs:{fixed:"",label:"日期",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.month)+"-"+e._s(e._f("padLeft")(t.row.date,2))+"\n        ")]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"打卡记录",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.clocktimes,function(a,r){return n("span",{key:a.valueOf(),staticClass:"item"},[0===r||r===t.row.clocktimes.length-1?[e._v("\n              "+e._s(a.toString())+"\n            ")]:e._e()],2)})}}])}),e._v(" "),e.columns.overtime?n("el-table-column",{attrs:{label:"加班"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.overtimes,function(t){return n("span",{key:t.length,staticClass:"item"},[e._v("\n            "+e._s(t.toString())+"\n          ")])})}}])}):e._e(),e._v(" "),e.columns.leave?n("el-table-column",{attrs:{label:"请假"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.leaves,function(t){return n("span",{key:t.length,staticClass:"item"},[e._v("\n            "+e._s(t.toString())+"\n          ")])})}}])}):e._e(),e._v(" "),e.columns.reimburse?n("el-table-column",{attrs:{label:"报销"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.reimburses,function(t){return n("span",{key:t.toString(),staticClass:"item"},[e._v("\n            "+e._s(t.toString())+"\n          ")])})}}])}):e._e(),e._v(" "),e.columns.exception?n("el-table-column",{attrs:{label:"备注",prop:"message"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.message)+"\n        ")]}}])}):e._e()],1)],1)])},staticRenderFns:[]}},366:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page"},[n("navHeader"),e._v(" "),n("router-view",{staticClass:"main"})],1)},staticRenderFns:[]}},367:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"headerWrapper"},[n("header",{ref:"header",staticClass:"header",class:{"header-home":e.isHome},style:e.headerStyle},[n("div",{staticClass:"container"},[n("h1",[n("router-link",{attrs:{to:"/"}},[e._v("\n          Excel 考勤分析\n          ")])],1),e._v(" "),n("ul",{staticClass:"nav"},[n("li",{staticClass:"nav-item"},[n("router-link",{attrs:{"active-class":"active",to:{name:"index"}}},[e._v("考勤日历\n          ")])],1),e._v(" "),n("li",{staticClass:"nav-item"},[n("router-link",{attrs:{"active-class":"active",to:{name:"upload"}}},[e._v("考勤表\n          ")])],1),e._v(" "),n("li",{staticClass:"nav-item"},[n("router-link",{attrs:{"active-class":"active",to:"/a",exact:""}},[e._v("考勤统计\n          ")])],1)])])])])},staticRenderFns:[]}},368:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page-container"},[n("h3",{staticClass:"page-header"},[e._v("\n    考勤月份：\n    "),n("el-date-picker",{attrs:{type:"month",placeholder:"选择月",format:"yyyy-MM"},on:{change:e.dateChange},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),e._v(" "),n("div",{staticClass:"upload"},[n("div",{staticClass:"el-upload-dragger",class:e.dragoverStyle?"dragoverHandleStyle":"",on:{dragover:e.dragoverHandle,dragleave:e.dragleaveHandle,drop:e.dragHandle}},[n("i",{staticClass:"el-icon-upload"}),e._v(" "),n("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或\n        "),n("em",{on:{click:function(t){e.selectFile()}}},[e._v("点击上传")])])]),e._v(" "),n("input",{staticClass:"el-upload__input",attrs:{id:"sheet",type:"file",name:"file",multiple:"multiple"},on:{change:e.fileChange}})])])},staticRenderFns:[]}},377:function(e,t,n){"use strict";const a=[{id:20170122,isWorkday:!0},{id:20170204,isWorkday:!0},{id:20170401,isWorkday:!0},{id:20170527,isWorkday:!0},{id:20170930,isWorkday:!0},{id:20170101,isWorkday:!1},{id:20170102,isWorkday:!1},{id:20170127,isWorkday:!1},{id:20170128,isWorkday:!1},{id:20170129,isWorkday:!1},{id:20170130,isWorkday:!1},{id:20170131,isWorkday:!1},{id:20170201,isWorkday:!1},{id:20170202,isWorkday:!1},{id:20170403,isWorkday:!1},{id:20170404,isWorkday:!1},{id:20170501,isWorkday:!1},{id:20170529,isWorkday:!1},{id:20170530,isWorkday:!1},{id:20171001,isWorkday:!1},{id:20171002,isWorkday:!1},{id:20171003,isWorkday:!1},{id:20171004,isWorkday:!1},{id:20171005,isWorkday:!1},{id:20171006,isWorkday:!1}];t.a=a},378:function(e,t){/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */
!function(e){"use strict";if(e.URL=e.URL||e.webkitURL,e.Blob&&e.URL)try{return void new Blob}catch(e){}var t=e.BlobBuilder||e.WebKitBlobBuilder||e.MozBlobBuilder||function(e){var t=function(e){return Object.prototype.toString.call(e).match(/^\[object\s(.*)\]$/)[1]},n=function(){this.data=[]},a=function(e,t,n){this.data=e,this.size=e.length,this.type=t,this.encoding=n},r=n.prototype,s=a.prototype,i=e.FileReaderSync,o=function(e){this.code=this[this.name=e]},u="NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),c=u.length,l=e.URL||e.webkitURL||e,d=l.createObjectURL,f=l.revokeObjectURL,h=l,m=e.btoa,v=e.atob,p=e.ArrayBuffer,y=e.Uint8Array;for(a.fake=s.fake=!0;c--;)o.prototype[u[c]]=c+1;return l.createObjectURL||(h=e.URL={}),h.createObjectURL=function(e){var t,n=e.type;return null===n&&(n="application/octet-stream"),e instanceof a?(t="data:"+n,"base64"===e.encoding?t+";base64,"+e.data:"URI"===e.encoding?t+","+decodeURIComponent(e.data):m?t+";base64,"+m(e.data):t+","+encodeURIComponent(e.data)):d?d.call(l,e):void 0},h.revokeObjectURL=function(e){"data:"!==e.substring(0,5)&&f&&f.call(l,e)},r.append=function(e){var n=this.data;if(y&&(e instanceof p||e instanceof y)){for(var r="",s=new y(e),u=0,c=s.length;u<c;u++)r+=String.fromCharCode(s[u]);n.push(r)}else if("Blob"===t(e)||"File"===t(e)){if(!i)throw new o("NOT_READABLE_ERR");var l=new i;n.push(l.readAsBinaryString(e))}else e instanceof a?"base64"===e.encoding&&v?n.push(v(e.data)):"URI"===e.encoding?n.push(decodeURIComponent(e.data)):"raw"===e.encoding&&n.push(e.data):("string"!=typeof e&&(e+=""),n.push(unescape(encodeURIComponent(e))))},r.getBlob=function(e){return arguments.length||(e=null),new a(this.data.join(""),e,"raw")},r.toString=function(){return"[object BlobBuilder]"},s.slice=function(e,t,n){var r=arguments.length;return r<3&&(n=null),new a(this.data.slice(e,r>1?t:this.data.length),n,this.encoding)},s.toString=function(){return"[object Blob]"},s.close=function(){this.size=this.data.length=0},n}(e);e.Blob=function(e,n){var a=n?n.type||"":"",r=new t;if(e)for(var s=0,i=e.length;s<i;s++)r.append(e[s]);return r.getBlob(a)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content||this)},379:function(e,t,n){(function(e){var a,r,s=s||"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator)||function(e){"use strict";if("undefined"==typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var t=e.document,n=function(){return e.URL||e.webkitURL||e},a=e.URL||e.webkitURL||e,r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),s=!e.externalHost&&"download"in r,i=e.webkitRequestFileSystem,o=e.requestFileSystem||i||e.mozRequestFileSystem,u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},c=0,l=[],d=function(){for(var e=l.length;e--;){var t=l[e];"string"==typeof t?a.revokeObjectURL(t):t.remove()}l.length=0},f=function(e,t,n){t=[].concat(t);for(var a=t.length;a--;){var r=e["on"+t[a]];if("function"==typeof r)try{r.call(e,n||e)}catch(e){u(e)}}},h=function(a,u){var d,h,m,v=this,p=a.type,y=!1,g=function(){var e=n().createObjectURL(a);return l.push(e),e},k=function(){f(v,"writestart progress write writeend".split(" "))},b=function(){if(!y&&d||(d=g()),!h){if(navigator.userAgent.match(/7\.[\d\s\.]+Safari/)&&void 0!==window.FileReader&&a.size<=157286400){var e=new window.FileReader;return e.readAsDataURL(a),e.onloadend=function(){var n=t.createElement("iframe");n.src=e.result,n.style.display="none",t.body.appendChild(n),k()},v.readyState=v.DONE,void(v.savedAs=v.SAVEDASUNKNOWN)}return window.open(d,"_blank"),v.readyState=v.DONE,v.savedAs=v.SAVEDASBLOB,void k()}h.location.href=d},w=function(e){return function(){if(v.readyState!==v.DONE)return e.apply(this,arguments)}},j={create:!0,exclusive:!1};if(v.readyState=v.INIT,u||(u="download"),s){d=g(),t=e.document,r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),r.href=d,r.download=u;var _=t.createEvent("MouseEvents");return _.initMouseEvent("click",!0,!1,e,0,0,0,0,0,!1,!1,!1,!1,0,null),r.dispatchEvent(_),v.readyState=v.DONE,v.savedAs=v.SAVEDASBLOB,void k()}if(e.chrome&&p&&"application/octet-stream"!==p&&(m=a.slice||a.webkitSlice,a=m.call(a,0,a.size,"application/octet-stream"),y=!0),i&&"download"!==u&&(u+=".download"),("application/octet-stream"===p||i)&&(h=e),!o)return void b();c+=a.size,o(e.TEMPORARY,c,w(function(e){e.root.getDirectory("saved",j,w(function(e){var t=function(){e.getFile(u,j,w(function(e){e.createWriter(w(function(t){t.onwriteend=function(t){h.location.href=e.toURL(),l.push(e),v.readyState=v.DONE,v.savedAs=v.SAVEDASBLOB,f(v,"writeend",t)},t.onerror=function(){var e=t.error;e.code!==e.ABORT_ERR&&b()},"writestart progress write abort".split(" ").forEach(function(e){t["on"+e]=v["on"+e]}),t.write(a),v.abort=function(){t.abort(),v.readyState=v.DONE,v.savedAs=v.FAILED},v.readyState=v.WRITING}),b)}),b)};e.getFile(u,{create:!1},w(function(e){e.remove(),t()}),w(function(e){e.code===e.NOT_FOUND_ERR?t():b()}))}),b)}),b)},m=h.prototype,v=function(e,t){return new h(e,t)};return m.abort=function(){var e=this;e.readyState=e.DONE,e.savedAs=e.FAILED,f(e,"abort")},m.readyState=m.INIT=0,m.WRITING=1,m.DONE=2,m.FAILED=-1,m.SAVEDASBLOB=1,m.SAVEDASURI=2,m.SAVEDASUNKNOWN=3,m.error=m.onwritestart=m.onprogress=m.onwrite=m.onabort=m.onerror=m.onwriteend=null,e.addEventListener("unload",d,!1),v.unload=function(){d(),e.removeEventListener("unload",d,!1)},v}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);void 0!==e&&null!==e?e.exports=s:null!==n(372)&&null!=n(373)?(a=[],void 0!==(r=function(){return s}.apply(t,a))&&(e.exports=r)):"undefined"!=typeof Meteor&&(Meteor.saveAs=s)}).call(t,n(204)(e))},380:function(e,t){},381:function(e,t){},62:function(e,t,n){"use strict";function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return new l.a(function(n,a){try{var r=new FileReader;r.onload=function(e){for(var a=new Uint8Array(e.target.result),r=[],s=a.byteLength,i=0;i<s;i++)r.push(String.fromCharCode(a[i]));var o=f.a.read(r.join(""),{type:"binary"}),u=o.SheetNames[t],c=o.Sheets[u],l=f.a.utils.sheet_to_json(c);n(l)},r.readAsArrayBuffer(e)}catch(e){a(e)}})}function r(e,t){return t&&(e+=1462),(Date.parse(e)-new Date(Date.UTC(1899,11,30)))/864e5}function s(){if(!(this instanceof s))return new s;this.SheetNames=[],this.Sheets={}}function i(e){for(var t={},n={s:{c:1e7,r:1e7},e:{c:0,r:0}},a=0;a!==e.length;++a)for(var s=0;s!==e[a].length;++s){n.s.r>a&&(n.s.r=a),n.s.c>s&&(n.s.c=s),n.e.r<a&&(n.e.r=a),n.e.c<s&&(n.e.c=s);var i={v:e[a][s]};if(null!=i.v){var o=f.a.utils.encode_cell({c:s,r:a});"number"==typeof i.v?i.t="n":"boolean"==typeof i.v?i.t="b":i.v instanceof Date?(i.t="n",i.z=f.a.SSF._table[14],i.v=r(i.v)):i.t="s",i.s={fill:{bgColor:{rgb:"ff00ff00"}},alignment:{horizontal:"center",vertical:"center"}},t[o]=i}}return n.s.c<1e7&&(t["!ref"]=f.a.utils.encode_range(n)),t}function o(e){for(var t=new ArrayBuffer(e.length),n=new Uint8Array(t),a=0;a!==e.length;++a)n[a]=255&e.charCodeAt(a);return t}function u(e,t){var n=new s;t.forEach(function(e){var t=i(e.data);n.SheetNames.push(e.name),n.Sheets[e.name]=t});var a=f.a.write(n,{bookType:"xlsx",bookSST:!0,type:"binary"});v()(new Blob([o(a)],{type:"application/octet-stream"}),e+".xlsx")}n.d(t,"a",function(){return p});var c=n(27),l=n.n(c),d=n(376),f=n.n(d),h=n(378),m=(n.n(h),n(379)),v=n.n(m),p={sheetToJson:a,export:u}},7:function(e,t,n){"use strict";var a=n(251);n.d(t,"d",function(){return a.a});var r=n(249);n.d(t,"a",function(){return r.a});var s=n(62);n.d(t,"h",function(){return s.a});var i=n(248);n.d(t,"j",function(){return i.a});var o=n(242);n.d(t,"c",function(){return o.a});var u=n(243);n.d(t,"g",function(){return u.b}),n.d(t,"f",function(){return u.c}),n.d(t,"e",function(){return u.a});var c=n(247);n.d(t,"i",function(){return c.a});var l=n(250);n.d(t,"b",function(){return l.a})}},[253]);
//# sourceMappingURL=app.ef3a4dcc3399a61e40de.js.map