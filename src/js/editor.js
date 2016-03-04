'use strict';
Vue.config.debug = true

Vue.component('fate-editor', {
  template: "<input v-model='content'/>",
  data: function() {
    return {
      content: '<b>Yoo Editor</b>'
    };
  }
});

Vue.component('fate-keyboard-key', {
  props: ['key', 'width'],
  template: '<button class="keyboard-key" v-bind:style="{width:100*width+\'%\'}">{{key}}</button>'
})

Vue.component('fate-keyboard', {
  props: {
    layout: Array
  },
  template: '<div id="fate-keyboard"><fate-keyboard-key v-for="key in layout" :width="key[1]" :key="key[0]"></fate-keyboard-key></div>'
});

Vue.component('intelligent-hint', {
  props: ['level', 'msg'],
  template: '<div class="intelligent"><span class="label {{getTag()}}">{{level}}</span> {{msg}}</div>',
  methods: {
    getTag: function() {
      if (this.level == 'Error') {
        return 'label-danger'
      } else if (this.level == 'Warning') {
        return 'label-warning'
      } else {
        return 'label-info'
      }
    }
  }
});

$(document).ready(function() {
  new Vue({
    el: '#app'
  });
});
