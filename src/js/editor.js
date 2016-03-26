'use strict';
// The debug flag should be deleted when publishing.
Vue.config.debug = true

var Key = function(name, fn, ins, shift){
    var tmp = Object();
    tmp.name = name;
    tmp.fn = fn;
    tmp.ins = ins;
    tmp.shift = shift;
    return tmp;
}

var keyMap = {
    "a" : Key("a", function() {}, "a", "A"),
    "b" : Key("b", function() {}, "b", "B"),
    "c" : Key("c", function() {}, "c", "C"),
    "d" : Key("d", function() {}, "d", "D"),
    "e" : Key("e", function() {}, "e", "E"),
    "f" : Key("f", function() {}, "f", "F"),
    "g" : Key("g", function() {}, "g", "G"),
    "h" : Key("h", function() {}, "h", "H"),
    "i" : Key("i", function() {}, "i", "I"),
    "j" : Key("j", function() {}, "j", "J"),
    "k" : Key("k", function() {}, "k", "K"),
    "l" : Key("l", function() {}, "l", "L"),
    "m" : Key("m", function() {}, "m", "M"),
    "n" : Key("n", function() {}, "n", "N"),
    "o" : Key("o", function() {}, "o", "O"),
    "p" : Key("p", function() {}, "p", "P"),
    "q" : Key("q", function() {}, "q", "Q"),
    "r" : Key("r", function() {}, "r", "R"),
    "s" : Key("s", function() {}, "s", "S"),
    "t" : Key("t", function() {}, "t", "T"),
    "u" : Key("u", function() {}, "u", "U"),
    "v" : Key("v", function() {}, "v", "V"),
    "w" : Key("w", function() {}, "w", "W"),
    "x" : Key("x", function() {}, "x", "X"),
    "y" : Key("y", function() {}, "y", "Y"),
    "z" : Key("z", function() {}, "z", "Z"),
    "1" : Key("1", function() {}, "1", "!"),
    "2" : Key("2", function() {}, "2", "@"),
    "3" : Key("3", function() {}, "3", "#"),
    "4" : Key("4", function() {}, "4", "$"),
    "5" : Key("5", function() {}, "5", "%"),
    "6" : Key("6", function() {}, "6", "^"),
    "7" : Key("7", function() {}, "7", "&"),
    "8" : Key("8", function() {}, "8", "*"),
    "9" : Key("9", function() {}, "9", "\("),
    "0" : Key("0", function() {}, "0", "\)"),
    "-" : Key("-", function() {}, "-", "_"),
    "=" : Key("=", function() {}, "=", "+"),
    "\[" : Key("\[", function() {}, "\[", "\{"),
    "\]" : Key("\]", function() {}, "\]", "\}"),
    "\\" : Key("\\", function() {}, "\\", "|"),
    "\`" : Key("\\", function() {}, "\\", "\~"),
    "," : Key(",", function() {}, ",", "\<"),
    "." : Key(".", function() {}, ".", "\>"),
    "/" : Key("/", function() {}, "/", "?"),
}

var globalVar = {
  editor: {
    content: '',
    shifted: false,
    mode: 'normal'
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
  template: "<div id='edit-area'> <p v-for='line in render()' v-html='line'></p> </div>",
  methods: {
    render: function() {
      return globalVar.editor.content.replace(/ /g, '&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').split('\n');
    }
  }
});

Vue.component('fate-keyboard-key', {
  props: ['n', 'i','s', 'width'],
  template: '<button class="keyboard-key" v-on:click="click" v-bind:style="{width:100*width+\'%\'}">{{getKey()}}</button>',
  methods: {
    getKey: function() {
      if (globalVar.editor.shifted) {
        return this.s;
      }
      switch(globalVar.editor.mode){
          case "normal":
            return this.n;
          case "insert":
            return this.i;
      }
      return this.i;
    },
    click: function() {
      switch (this.getKey()) {
          case 'Tab':
            globalVar.editor.content += '\t';
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
            globalVar.editor.content += ' ';
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
