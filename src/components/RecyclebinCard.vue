<template>
  <div id="cardbox" :class="cardstyle">
    <el-card class="box-card" shadow="hover" :body-style="{margin: '0px', padding: '10px' }">
      <div class="head">
          <span class="nothighlight">&nbsp;{{date}}&nbsp;{{editstatus}}</span>
          <span class="nothighlight">&nbsp;&nbsp;&nbsp;{{deletetime}}&nbsp;移到此处</span>
          <span :class="ishighlight">&nbsp;&nbsp;&nbsp;{{lefttime}}&nbsp;天后自动删除</span>
      </div>
      <div class="body">{{task}}</div>
      <div class="foot">
        <span v-if="tag.length > 0">&nbsp;#{{tag}}#</span>
        <span v-else>&nbsp;#默认#</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="recovertask(id)">恢复任务</el-button>
        <el-button style="float: right; padding: 3px 0" type="text" @click="deletetask(id)">彻底删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
    props: ["id", "task", "date", "editstatus", "done", "tag", "deletetime", "lefttime"],
    computed: {
        ishighlight() {
            return this.lefttime <= 31 ? "highlight" : "nothighlight"
        },
        bodystyle() {
            return this.done ? "linethrough" : "notlinethrough"
        },
        cardstyle() {
            return this.done ? "linethrough" : "notlinethrough"
        }
    },
    methods: {
        recovertask(id) {
            this.$emit("emitrecover", id);
        },
        deletetask(id) {
            this.$emit("emitdelete", id);
        }
    }
};
</script>

<style scoped>
#cardbox {
  margin-top: 10px;
}

.highlight {
    font-size: 15px;
    color: rgb(209, 72, 38);
}

.nothighlight {
    font-size: 15px;
    color: #A3A4A7;
}

.linethrough .body {
    color: #A3A4A7;
    font-size: 20px;
    text-decoration: line-through black;
}

.linethrough .foot {
    color: #A3A4A7;
    text-decoration: line-through black;
}

.notlinethrough .body{
    font-size: 20px;
}

.notlinethrough .foot {
    color: rgb(209, 72, 38);
}
</style>