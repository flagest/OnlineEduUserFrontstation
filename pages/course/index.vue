<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click="initCourseFirst()">全部</a>
                </li>
                <li v-for="(item,index) in subjectNestedList" :key="index" :class="{active:oneIndex==index}">
                  <a :title="item.title" href="#" @click="serachOne(item.id,index)">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(item,index) in subSubjectList " :key="index" :class="{active:twoIndex==index}">
                  <a :title="item.title" href="#" @click="serachTwo(item.id,index)">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange' :buyCountSort!=''}">
                <a title="关注度" href="javascript:void(0);" @click="searchByCount()">销量</a>
                <span :class="{hiden:buyCountSort==''}">↓</span>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void (0);" @click="serachCreate()">最新</a>
                <span :class="{hide:gmtCreateSort==''}">↓</span>
              </li>
              <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="javascript:void(0)" @click="serachPrice()">价格&nbsp;&nbsp;
                  <span :class="{hide:priceSort==''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total===0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list" v-if="data.total>0">
            <ul class="of" id="bna">
              <li v-for="item in data.items " :key="item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.cover" class="img-responsive" :alt="item.title">
                    <div class="cc-mask">
                      <a :href="'/course/'+item.id" :title="item.title" class="comm-btn c-btn-1">{{item.title}}</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+item.id" :title="item.title" class="course-title fsize18 c-333">{{item.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">{{item.price==0?'免费':'付费'}}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{item.buyCount}}</i>
                      |
                      <i class="c-999 f-fA">{{item.viewCount}}</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <a :class="{undisable:!data.hasPrevious}"
               href="#" title="首页"
               @click.prevent="gotoPage(1)">
              首页
            </a>
            <a :class="{undisable:!data.hasPrevious}"
               href="#" title="前一页"
               @click.prevent="gotoPage(data.current-1)">&lt;</a>

            <a v-for="page in data.pages"
               :key="page"
               :class="{current:data.current==page,undisable:data.current==page}"
               :title="'第'+page+'页'"
               href="#"
               @click.prevent="gotoPage(page)">{{page}}</a>

            <a :class="{undisable:!data.hasNext}"
               href="#" title="后一页"
               @click.prevent="gotoPage(data.current+1)">&gt;</a>

            <a :class="{undisable:!data.hasNext}"
               href="#" title="尾页"
               @click.prevent="gotoPage(data.pages)">尾页</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
  import courseApi from '@/api/course'

  export default {
    data() {
      return {
        page: 1, //当前页
        data: {},
        subjectNestedList: [], // 一级分类列表
        subSubjectList: [], // 二级分类列表
        searchObj: {}, // 查询表单对象
        oneIndex: -1,
        twoIndex: -1,
        buyCountSort: "",
        gmtCreateSort: "",
        priceSort: ""
      }
    },
    created() {
      //查询第一页数据
      this.initCourseFirst();
      //查询一级分类
      this.initSubject();
    },
    methods: {
      //查询课程列表
      initCourseFirst() {
        this.searchObj = {};
        courseApi.getFrontCourseList(1, 8, this.searchObj).then(response => {
          this.data = response.data.data;
        })
      },
      //查询课程分类信息
      initSubject() {
        courseApi.getAllOneTwoSubject().then(response => {
          this.subjectNestedList = response.data.data.data;
        })
      },
      //分页切换
      gotoPage(page) {
        courseApi.getFrontCourseList(page, 8, this.searchObj).then(response => {
          this.data = response.data.data;
        })
      },
      //根据一级分类查询二级分类
      serachOne(subjectOneId, index) {
        //把传递index赋值给OneIndex
        this.oneIndex = index;
        this.twoIndex = -1;

        this.searchObj = {};
        //把一级分类赋值给查询对象
        this.searchObj.subjectParentId = subjectOneId;
        //分页函数
        this.gotoPage(1)

        //获取二级分类
        this.subSubjectList = this.subjectNestedList[index].children;

      },
      //点击二级分类查询
      serachTwo(subjectTwoId, index) {
        this.searchObj = {};
        this.searchObj.subjectId = subjectTwoId;
        //分页查询
        this.gotoPage(1);
      },
      //第六根据销量排序
      searchByCount() {
        //设置对应值，为了样式生效
        this.buyCountSort = "1";
        this.gmtCreateSort = "";
        this.priceSort = "";
        this.searchObj.buyCountSort = this.buyCountSort
        this.searchObj.gmtCreateSort = this.gmtCreateSort
        this.searchObj.priceSort = this.priceSort
        this.gotoPage(1)
      },
      serachCreate() {
        //设置对应值，为了样式生效
        this.buyCountSort = "";
        this.gmtCreateSort = "1";
        this.priceSort = "";
        this.searchObj.buyCountSort = this.buyCountSort
        this.searchObj.gmtCreateSort = this.gmtCreateSort
        this.searchObj.priceSort = this.priceSort
        this.gotoPage(1)
      },
      serachPrice() {
        //设置对应值，为了样式生效
        this.buyCountSort = "";
        this.gmtCreateSort = "";
        this.priceSort = "1";
        this.searchObj.buyCountSort = this.buyCountSort
        this.searchObj.gmtCreateSort = this.gmtCreateSort
        this.searchObj.priceSort = this.priceSort
        this.gotoPage(1)
      }
    },
  };
</script>
<style scoped>
  .active {
    background: #bdbdbd;
  }

  .hide {
    display: none;
  }

  .show {
    display: block;
  }
</style>
