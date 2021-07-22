<template>
      <li>
        <template v-if="!edit">
          <input type="checkbox" v-model="done">{{ content }}
          <button @click="$emit('editThis')">編輯</button>
        </template>
        <template v-else>
          <input type="text" v-model="content">
          <button @click="$emit('editComplete', editTodo)">完成</button>
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
        this.editTodo.content = value
      }
    },
    done: {
      get () {
        return this.todo.done
      },
      set (value) {
        this.editTodo.done = value
        this.$emit('check', value)
      }
    }
  },
  data () {
    return {
      editTodo: {
        content: '',
        done: false
      }
    }
  },
  mounted () {
    this.editTodo.done = this.done
    this.editTodo.content = this.content
  }
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
