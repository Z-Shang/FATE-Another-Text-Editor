'use strict';
// The debug flag should be deleted when publishing.
Vue.config.debug = true

var globalVar = {
  editor: {
    content: '',
    shifted: false
  },
  hint: {
    list: [
      ['Error', "line 5: 'scope' is not defined."],
      ['Error', "line 6: 'let' requires for ECMAScript 6."],
      ['Error', "line 7: 'const' requires for ECMAScript 6."],
      ['Warning', "line 22: 'foo' is defined but not use."],
      ['Warning', "line 27: 'bar' is defined but not use."]
  ]}
};

Vue.component('fate-editor', {
  template: "<div id='edit-area'> <p v-for='line in render()'>{{line}}</p> </div>",
  methods: {
    render: function() {
      return globalVar.editor.content.split('\n');
    }
  }
});

Vue.component('fate-keyboard-key', {
  props: ['key1', 'key2', 'width'],
  template: '<button class="keyboard-key" v-on:click="click" v-bind:style="{width:100*width+\'%\'}">{{getKey()}}</button>',
  methods: {
    getKey: function() {
      if (globalVar.editor.shifted) {
        return this.key2;
      }
      return this.key1;
    },
    click: function() {
      switch (this.getKey()) {
          case 'Tab':
            globalVar.editor.content += '&nbsp;&nbsp;';
            break;
          case 'Enter':
            globalVar.editor.content += '\n';
            break;
          case 'Del':
            globalVar.editor.content = globalVar.editor.content.slice(0, -1);
            break;
          case 'Shift':
            globalVar.editor.shifted = !globalVar.editor.shifted;
            break;
          case 'Space':
            globalVar.editor.content += '&nbsp;';
            break;
          default:
            globalVar.editor.content += this.getKey();
            globalVar.editor.shifted = false;
        }
    }
  }
})

Vue.component('fate-keyboard', {
  props: {
    layout: Array
  },
  template: '<div id="fate-keyboard"><fate-keyboard-key v-for="key in layout" :width="key[2]" :key1="key[0]" :key2="key[1]"></fate-keyboard-key></div>'
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
