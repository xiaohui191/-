<template>
  <div id="system_integral">
    <div class="xyh_top"><h1>{{title}}</h1></div>
    <div class="xyh_table">
        <div class="xyh_search">
           <div v-if="id == 1">
                <div class="xyh_crossBar"><div></div><span>消费送积分</span></div>
                <div class="xyh_preprnd_append">
                    <el-input v-model="input3" style="width:400px">
                            <template slot="prepend">每消费</template>
                            <template slot="append">元</template>
                        </el-input>
                    <el-input v-model="input3" style="width:400px">
                            <template slot="prepend">赠送</template>
                            <template slot="append">积分</template>
                        </el-input>
                </div>
                <div class="xyh_crossBar"><div></div><span>积分抵扣</span></div>
                <div class="xyh_preprnd_append">
                    <el-input v-model="input3" style="width:400px">
                            <template slot="prepend">每使用</template>
                            <template slot="append">积分</template>
                        </el-input>
                    <el-input v-model="input3" style="width:400px">
                            <template slot="prepend">抵扣</template>
                            <template slot="append">元</template>
                        </el-input>
                        <div>
                            <el-input v-model="input3" style="width:400px">
                                <template slot="prepend">消费最高抵现上限</template>
                                <template slot="append">积分</template>
                            </el-input>
                        </div>
                </div>
                <div class="xyh_crossBar"><div></div><span>会员积分</span></div>
                <div class="xyh_preprnd_append">
                    <el-input v-model="input3" style="width:400px">
                            <template slot="prepend">注册成功可获得</template>
                            <template slot="append">积分</template>
                        </el-input>
                    <el-input v-model="input3" style="width:400px">
                            <template slot="prepend">推荐注册成功可获得</template>
                            <template slot="append">积分</template>
                        </el-input>
                </div>
           </div>
           <div v-if="id == 2">
                <div class="xyh_preprnd_append">
                    <el-form label-width="80px" inline>
                    <el-form-item label="等级添加">
                        <el-select v-model="region" placeholder="请选择类型" style="width:200px;">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-form>
                    <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                    <el-input v-model="input3" style="width:300px" class="xyh_input_text" placeholder="0">
                        <template slot="prepend">累积</template>
                        <template slot="append">经验值</template>
                    </el-input>
                    <el-input v-model="input3" style="width:300px" class="xyh_input_text" placeholder="1">
                        <template slot="prepend">提升至</template>
                        <template slot="append">等级</template>
                    </el-input>
                    <el-button @click="submit()">确定添加</el-button>
                </div>
                <el-table :data="tableData" border style="width: 100%;margin-bottom:50px;" class="table">
                    <el-table-column label="类型" align="center">
                        <template slot-scope="scope">{{scope.row.type}}</template>
                    </el-table-column>
                    <el-table-column label="等级设置" align="center">
                        <template slot-scope="scope">{{scope.row.grade}}</template>
                    </el-table-column>
                    <el-table-column label="累积经验值" align="center">
                        <template slot-scope="scope">{{scope.row.experience}}</template>
                    </el-table-column>
                    <el-table-column label="提升等级" align="center">
                        <template slot-scope="scope">{{scope.row.addtype}}</template>
                    </el-table-column>
                </el-table>
           </div>
           <div v-if="id == 3">
                <div class="xyh_crossBar"><div></div><span>新注册经验值</span></div>
                <div class="xyh_preprnd_append">
                    <el-input v-model="input3" style="width:400px">
                            <template slot="prepend">注册成功可获得</template>
                            <template slot="append">经验值</template>
                        </el-input>
                    <el-input v-model="input3" style="width:400px">
                            <template slot="prepend">推荐注册成功可获得</template>
                            <template slot="append">经验值</template>
                        </el-input>
                </div>
                <div class="xyh_crossBar"><div></div><span>登录经验值</span></div>
                <div class="xyh_preprnd_append">
                    <el-input v-model="input3" style="width:400px">
                            <template slot="prepend">每日登录</template>
                            <template slot="append">次</template>
                        </el-input>
                    <el-input v-model="input3" style="width:400px">
                            <template slot="prepend">提升</template>
                            <template slot="append">经验值</template>
                        </el-input>
                </div>
                <div class="xyh_crossBar"><div></div><span>下单经验值</span></div>
                <div class="xyh_preprnd_append">
                    <el-input v-model="input3" style="width:400px">
                            <template slot="prepend">每消费</template>
                            <template slot="append">元</template>
                        </el-input>
                    <el-input v-model="input3" style="width:400px">
                            <template slot="prepend">提升</template>
                            <template slot="append">经验值</template>
                        </el-input>
                </div>
                <div class="xyh_crossBar"><div></div><span>下级下单经验值</span></div>
                <div class="xyh_preprnd_append">
                    <el-input v-model="input3" style="width:400px">
                            <template slot="prepend">下级每消费</template>
                            <template slot="append">元</template>
                        </el-input>
                    <el-input v-model="input3" style="width:400px">
                            <template slot="prepend">提升</template>
                            <template slot="append">经验值</template>
                        </el-input>
                </div>
           </div>
           <div class="xyh_button" style="text-align:center;"><el-button @click="submit()" style="width:120px;">确定并保存</el-button><el-button @click="submit()" style="width:120px; margin-left:20px;">关闭</el-button></div>
        </div>
    </div>
  </div>
</template>
<script>
import '@/assets/scss/system.scss'
export default {
  data () {
      return {
          title:'',
          input3:'',

        //   等级设置参数
          region:'',
          num1: 1,
          tableData:[{
                type:'个人',
                grade: '3级',
                experience:1000,
                addtype:'1级',
          },{
                type:'企业',
                grade: '2级',
                experience:2000,
                addtype:'1级',
          }]
      }
  },
  methods: {
      init(){
          this.id = this.$route.query.id
          switch (Number(this.id)){
            case 1:
                this.title = '积分设置'
                break
            case 2:
                this.title = '等级设置'
                break
            case 3:
                this.title = '经验值设置'
                break
          }
      },
      submit(){
        if(this.id == 1){

        }else if(this.id == 2){

        }else if(this.id == 3){

        }
        this.$message({
            duration:1500,
            message: '保存成功',
            type: 'success',
        });
        this.init();
      },
      handleChange(value){
          console.log(value);
      }
  },
  watch:{
      '$route' (to,from){
          this.init();      //当路由变化时 则调用它
      }
  },
  created(){
      this.init();
  },
}
</script>
<style scoped>

</style>
