<template>
  <div class="box">
    <div class="header">
      <span class="header-left">待办事项</span>
      <span class="header-right"
        ><a href="/"><i class="el-icon-position"></i>导航页</a>
        <a href="/logout"><i class="el-icon-switch-button"></i>退出</a></span
      >
    </div>

    <el-input
      placeholder="试试用 #内容# 的格式添加标签，例如：#加油💪#"
      v-model="input"
      clearable
    ></el-input>
    <div class="btnbox">
      <el-button
        class="elbtn"
        type="success"
        :disabled="this.input.length === 0"
        size="small"
        icon="el-icon-thumb"
        @click="submit"
        >添加新任务</el-button
      >
    </div>

    <el-tabs type="border-card">
      <el-tab-pane label="全部">
        <h3 v-if="activeTasks.length === 0">无记录...</h3>
        <span v-else>共{{ activeTasks.length }}条记录</span>
        <Card
          v-for="item in activeTasks"
          :key="item.id"
          :id="item.id"
          :task="item.task"
          :date="item.date"
          :time="item.time"
          :editstatus="item.editstatus"
          :done="item.done"
          :tag="item.tag"
          @emitstatus="getstatus"
          @emitremove="getremove"
          @emitedit="getedit"
        ></Card>
      </el-tab-pane>

      <el-tab-pane label="未完成">
        <h3 v-if="unfinishedTasks.length <= 0">无记录...</h3>
        <span v-else>共{{ unfinishedTasks.length }}条记录</span>
        <!-- <TodoTab v-if="unfinishedThings.length > 0" @sendidtohome="getidfromtab" :things="unfinishedThings"></TodoTab> -->
        <Card
          v-for="item in unfinishedTasks"
          :key="item.id"
          :id="item.id"
          :task="item.task"
          :date="item.date"
          :time="item.time"
          :editstatus="item.editstatus"
          :done="item.done"
          :tag="item.tag"
          @emitstatus="getstatus"
          @emitremove="getremove"
          @emitedit="getedit"
        ></Card>
      </el-tab-pane>

      <el-tab-pane label="已完成">
        <h3 v-if="finishedTasks.length <= 0">无记录...</h3>
        <span v-else>共{{ finishedTasks.length }}条记录</span>
        <!-- <TodoTab v-if="finishedThings.length > 0" @sendidtohome="getidfromtab" :things="finishedThings"></TodoTab> -->
        <Card
          v-for="item in finishedTasks"
          :key="item.id"
          :id="item.id"
          :task="item.task"
          :date="item.date"
          :time="item.time"
          :editstatus="item.editstatus"
          :done="item.done"
          :tag="item.tag"
          @emitstatus="getstatus"
          @emitremove="getremove"
          @emitedit="getedit"
        ></Card>
      </el-tab-pane>
      <el-tab-pane label="回收站">
        <span id="recyclebin"
          ><i>回收站里的数据最多保留一年(按366天计算),过期自动删除</i></span
        >
        <br />
        <h3 v-if="recyclebinTasks.length <= 0">这里一片虚无...</h3>
        <span v-else>共{{ recyclebinTasks.length }}条记录</span>
        <RecyclebinCard
          v-for="item in recyclebinTasks"
          :key="item.id"
          :id="item.id"
          :task="item.task"
          :date="item.date"
          :editstatus="item.editstatus"
          :done="item.done"
          :tag="item.tag"
          :deletetime="item.deletetime"
          :lefttime="item.lefttime"
          @emitrecover="getrecover"
          @emitdelete="getdelete"
        ></RecyclebinCard>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Card from "./Card";
import RecyclebinCard from "./RecyclebinCard";

export default {
  components: {
    Card,
    RecyclebinCard,
  },
  data() {
    return {
      input: "",
      allTasks: [],
    };
  },
  computed: {
    activeTasks() {
      return this.allTasks.filter((e) => {
        return !e.deleted;
      });
    },
    finishedTasks() {
      return this.allTasks.filter((e) => {
        return !e.deleted && e.done;
      });
    },
    unfinishedTasks() {
      return this.allTasks.filter((e) => {
        return !e.deleted && !e.done;
      });
    },
    recyclebinTasks() {
      return this.allTasks.filter((e) => {
        return e.deleted;
      });
    },
  },
  created() {
    this.$axios
      .post("todolist/api", {
        code: 100,
        data: "",
      })
      .then((res) => {
        this.$toast({
          type: "success",
          message: "数据更新成功！",
        });
        if (res.data.data.length > 0) {
          this.allTasks = res.data.data;
        }
      })
      .catch((error) => {
        this.$message({
          showClose: true,
          message: "请求服务器数据出错！",
          type: "error",
        });
      });
  },
  methods: {
    getstatus(id) {
      var pos = this.allTasks.findIndex((n) => n.id == id);
      var jsonData = {
        code: 101,
        data: {
          id: id,
          done: Math.pow(0, this.allTasks[pos].done),
        },
      };
      this.$axios
        .post("/todolist/api", jsonData)
        .then((res) => {
          this.allTasks[pos].done = !this.allTasks[pos].done;
          this.$message({
            showClose: true,
            message: "数据更新成功！",
            type: "success",
          });
        })
        .catch((error) => {
          this.$message({
            showClose: true,
            message: "请求服务器数据出错！",
            type: "error",
          });
        });
    },
    getremove(id) {
      var pos = this.allTasks.findIndex((n) => n.id == id);
      var jsonData = {
        code: 103,
        data: id,
      };
      this.$confirm("稍后你可以在回收站中找到它, 继续吗?", "移除该记录", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/todolist/api", jsonData)
            .then((res) => {
              this.$message({
                type: "success",
                message: "移除成功!",
              });
              this.allTasks[pos].deleted = 1;
              this.allTasks[pos].deletetime = res.data.data;
              this.allTasks[pos].lefttime = 366;
            })
            .catch((error) => {
              console.log(error);
              this.$message({
                showClose: true,
                message: "向服务器请求更新数据出错！",
                type: "error",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消移除",
          });
        });
    },
    getedit(id) {
      var pos = this.allTasks.findIndex((n) => n.id == id);
      this.$prompt("你也可以输入😍emoji表情哦", "编辑内容", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: this.allTasks[pos].task + this.allTasks[pos].tag,
      })
        .then(({ value }) => {
          var jsonData = {
            code: 102,
            data: {
              id: id,
              content: value,
            },
          };
          this.$axios
            .post("/todolist/api", jsonData)
            .then((res) => {
              this.allTasks[pos].task = res.data.data.task;
              this.allTasks[pos].tag = res.data.data.tag;
              this.allTasks[pos].editstatus = "编辑";
              this.$message({
                type: "success",
                message: "修改内容提交成功！",
              });
            })
            .catch((error) => {
              console.log(error);
              this.$message({
                showClose: true,
                message: "向服务器请求更新数据出错！",
                type: "error",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消编辑",
          });
        });
    },
    getrecover(id) {
      var pos = this.allTasks.findIndex((n) => n.id == id);
      var jsonData = {
        code: 104,
        data: id,
      };
      this.$confirm("将此记录恢复到以前的位置, 继续吗?", "恢复", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/todolist/api", jsonData)
            .then((res) => {
              this.$message({
                type: "success",
                message: "恢复成功!",
              });
              this.allTasks[pos].deleted = 0;
            })
            .catch((error) => {
              console.log(error);
              this.$message({
                showClose: true,
                message: "向服务器请求更新数据出错！",
                type: "error",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消恢复",
          });
        });
    },
    getdelete(id) {
      var pos = this.allTasks.findIndex((n) => n.id == id);
      var jsonData = {
        code: 105,
        data: id,
      };
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.$axios
            .post("/todolist/api", jsonData)
            .then((res) => {
              this.allTasks.splice(pos, 1);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch((error) => {
              this.$message({
                showClose: true,
                message: "向服务器请求更新数据出错！",
                type: "error",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    submit() {
      var intext = this.input.trim();
      if (intext.length <= 0) {
        this.input = "";
        return;
      }
      var jsonData = {
        code: 106,
        data: intext,
      };
      this.$axios
        .post("/todolist/api", jsonData)
        .then((res) => {
          this.allTasks.unshift(res.data.data);
          this.input = "";
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            showClose: true,
            message: "请求服务器数据出错！",
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 10px;
}
.header-left {
  font-size: 30px;
  padding-left: 20px;
}
.header-right {
  padding-right: 15px;
}

.header-right a {
  color: black;
}

.btnbox {
  text-align: right;
}
.elbtn {
  margin: 5px;
  margin-right: 5px;
}

.box {
  max-width: 600px;
  margin: 0 auto;
}

#recyclebin {
  font-size: 15px;
  color: rgb(245, 44, 18);
}
</style>