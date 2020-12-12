<template>
  <div id="cardbox" :class="cardstyle">
    <el-card class="box-card" shadow="hover" :body-style="{margin: '0px', padding: '10px' }">
      <div class="contentbox">
        <div class="left">
          <div class="switchbox" @click="status(id)">
            <el-switch active-color="#A3A4A7" inactive-color="#13ce66" :value="!!done"></el-switch>
          </div>
        </div>
        <div class="right">
          <div class="head">&nbsp;{{date}}&nbsp;&nbsp;{{time}}&nbsp;{{editstatus}}</div>
          <div class="body">{{task}}</div>
          <div class="foot">
              <span v-if="tag != ''">&nbsp;{{tag}}</span>              
              <span v-else>&nbsp;#默认#</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="edit(id)">编辑任务</el-button>
              <el-button style="float: right; padding: 3px 0" type="text" @click="remove(id)">移除任务</el-button>
            </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["id", "task", "date", "time", "editstatus","done", "tag"],
  methods: {
    status(id) {
      this.$emit("emitstatus", id);
    },
    edit(id) {
      this.$emit("emitedit", id);
    },
    remove(id) {
      this.$emit("emitremove", id);
    }
  },
  computed: {
      cardstyle() {
          return !this.done ? "normal" : "delete"
      }
  }
};
</script>

<style scoped>
#cardbox {
  margin-top: 10px;
}

.contentbox {
  display: grid;
  grid-template-columns: 50px auto;
}

.left {
  display: flex;
  align-items: center;
}

.head {
    font-size: 15px;
    color: rgb(103, 112, 111);
}

.foot {
    font-size: 15px;
    color: rgb(209, 72, 38);
}
.normal .body {
    font-size: 20px;
}

.delete .body{
    font-size: 15px;
    color: #A3A4A7;
    text-decoration: line-through black;
}

.delete .foot {
    color: #A3A4A7;
    text-decoration: line-through black;
}
</style>