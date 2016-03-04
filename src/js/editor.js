'use strict';
Vue.config.debug = true

var globalVar = {
  content: '',
  shifted: false
};

Vue.component('fate-editor', {
  template: "<div v-html='render()' id='edit-area'/>",
  methods: {
    render: function() {
      var lines =  globalVar.content.split('\n');
      var html = '';
      for (var i = 0; i < lines.length; i++){
        html += '<p>' + lines[i] + '</p>';
      }
      return html;
    }
  }
});

Vue.component('fate-keyboard-key', {
  props: ['key', 'width'],
  template: '<button class="keyboard-key" v-on:click="click" v-bind:style="{width:100*width+\'%\'}">{{key}}</button>',
  methods: {
    click: function() {
      if (!globalVar.shifted) {
        switch (this.key) {
          case 'Tab':
            globalVar.content += '&nbsp&nbsp';
            break;
          case 'Enter':
            globalVar.content += '\n';
            break;
          case 'Del':
            globalVar.content = globalVar.content.slice(0, -1);
            break;
          case 'Shift':
            globalVar.shifted = true;
            break;
          default:
            globalVar.content += this.key.toLowerCase();
        }
      } else {
        globalVar.shifted = false;
        globalVar.content += this.key;
      }
    }
  }
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
  var vueApp = new Vue({
    el: '#app',
    data: globalVar
  });
});
