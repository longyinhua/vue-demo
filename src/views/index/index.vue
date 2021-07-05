<template>
  <div class="more-container">
    <el-row :gutter="20">
      <el-col v-for="(item,index) in list" :key="index" :xs="24" :sm="8" :md="8" :lg="8" :xl="4">
        <el-card shadow="hover">
          <div slot="header">
            <span>{{ item.author }}</span>
          </div>
          <div style="width: 100%;height: 200px">
            <vab-image
              :big-src="item.img"
              :percent="item.percent"
              :small-src="item.smallImg"
              @clickBig="bigImgClick"
              @clickSmall="smallImgClick"></vab-image>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getList, testInterface } from '@/api/home';
  import VabImage from '@/components/DyImage'
  export default {
    name: 'More',
    components: {
      VabImage
    },
    data() {
      return {
        nodeEnv: process.env.NODE_ENV,
        list: [],
        listLoading:true,
        pageNo: 1,
        pageSize: 10,
        total: 0,

        dateMap:[],
        jsonStr:['2018-8-14','2018-6-14']
      }
    },
    created() {
      // this.fetchData()
    },
    mounted() {
      let newArr = this.jsonStr.map((item) => {
        let json = {}
        json.date = item.split('-').join('/')
        json.title = '';
        return json;
      })
      this.dateMap = newArr
      // console.log(this.dateMap)
      const items = new Set([1, 2, 3, 4, 5,5,1]);
      const array = Array.from(items);
      // console.log(...new Set(array))

      let set = new Set(['red', 'green', 'blue']);
      for(let item of set.keys()){
        console.log(item)
      }
    },

    methods: {
      bigImgClick(){
        this.$baseAlert('点击了大图')
      },
      smallImgClick(){
        this.$baseAlert('点击了小图')
      },
      async fetchData(){
        this.listLoading = true;
        try {
          let params = {
            pageNo: this.pageNo,
            pageSize: this.pageSize
          }
          const { result } = await testInterface({str:'uuu'});
          console.log(result)
          /*const { code, data, totalCount } = await getList(params)
          this.list = data
          this.total = totalCount*/
        }catch (e) {
          this.list = [];
          this.listLoading = false;
        }finally {
          this.listLoading = false;
        }
      }
    },
  }
</script>
