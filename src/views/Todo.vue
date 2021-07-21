<template>
  <div class="todo">
    <h1>This is an about page</h1>
    <router-link to="/todo" replace>All</router-link> |
    <router-link to="/todo?filter=action" replace>Active</router-link> |
    <router-link :to="{path:'/todo',query:{filter:'done'}}" replace>Done</router-link>
    <p>show: {{ filter }}</p>
    <div>{{ list }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filter: 'all' // all, active, done
    }
  },
  computed: {
    list () {
      return this.$store.getters.filterList(this.filter) // 可以不用wach直接取用this.$router.query.filter(不嚴謹)
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
  }
}
</script>
