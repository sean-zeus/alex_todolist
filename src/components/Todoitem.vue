<template>
      <li>
        <template v-if="!edit">
          <input type="checkbox" v-model="done">{{ content }}
        </template>
        <template v-else>
          <input type="text" v-model="content">
        </template>
      </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    content: {
      get () {
        return this.todo.content
      },
      set (value) {
        // this.todo.content = value
      }
    },
    done: {
      get () {
        return this.todo.done
      },
      set (value) {
        // this.todo.done = value
        this.$emit('check', value)
      }
    }
  }
  // data () {
  //   return {
  //     content: '',
  //     done: false
  //   }
  // },
  // mounted () {
  //   this.content = this.todo.content
  //   this.done = this.todo.done
  // },
  // watch: {
  //   done: {
  //     // deep: true, // 偵聽物件要加
  //     // immediate: true, // 物件寫法可以加上immediate在一開始就執行
  //     handler (done) {
  //       this.$emit('check', done)
  //     }
  //   }
  // }
}
</script>

<style>

</style>
