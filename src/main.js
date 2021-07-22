import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.directive('focus', {
  inserted: (el, binding, vnode, oldVnode) => {
    // console.log(el, binding, vnode, oldVnode)
    el.select()
    el.focus()

    el.addEventListener('keydown', event => {
      // console.log(event.key) // event.keyCode
      if (event.key === 'Enter' || event.key === 'Tab') {
        // targetForm是表單的ID
        // document.getElementById('targetForm').submit()
        // ID為defaultSubmitm增加click事件
        // document.getElementById('defaultSubmit').onclick = function () { console.log(event.keyCode) }
        // 呼叫ID為defaultSubmitm的click事件
        document.getElementById('defaultSubmit').click()
      }
    })
  }
  // update: (el, binding, vnode, oldVnode) => {
  //   console.log(el, binding, vnode, oldVnode)
  // }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
