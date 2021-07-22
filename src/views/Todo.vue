<template>
  <div class="todo">
    <h1>This is an about page</h1>
    <router-link to="/todo" replace>All</router-link> |
    <router-link to="/todo?filter=active" replace>Active</router-link> |
    <router-link :to="{path:'/todo',query:{filter:'done'}}" replace>Done</router-link>
    <!-- <p>show: {{ filter }}</p>
    <div>{{ list }}</div> -->
    <ul>
      <!-- <li v-for="item of list" :key=item.tId>
        <template v-if="edit !== item.tId">
          <input type="checkbox" v-model="item.todo.done">{{ item.todo.content }}
        </template>
        <template v-else>
          <input type="text" v-model="item.todo.content">
        </template>
      </li> -->
      <Todoitem
        v-for="item of list"
        :key=item.tId
        :todo="item.todo"
        :edit="item.tId === edit"
        @check="value => checkHandler(item.tId,value)"
      />
    </ul>
  </div>
</template>

<script>
import Todoitem from '../components/Todoitem.vue'

export default {
  components: {
    Todoitem
  },
  data () {
    return {
      filter: 'all', // all, active, done
      edit: null
    }
  },
  computed: {
    list () {
      return this.$store.getters.filterList(this.filter) // 可以不用wach直接取用this.$router.query.filter(不嚴謹)
    }
  },
  methods: {
    checkHandler (tId, done) {
      // console.log(tId, done)
      this.$store.dispatch('UPDATE_TODOS_DONE', { tId, done })
    }
  },
  watch: {
    // function寫法
    // $route: function (router) {
    //   // check query 可以加判斷式檢查query是否正確來轉址
    //   this.filter = router.query.filter || 'all'
    // }
    // 物件寫法可以加上immediate在一開始就執行
    $route: {
      immediate: true,
      handler: function (router) {
        // check query 可以加判斷式檢查query是否正確來轉址
        this.filter = router.query.filter || 'all'
      }
    }
  },
  mounted () {
    this.$store.dispatch('READ_TODOS')
  }
}
</script>
