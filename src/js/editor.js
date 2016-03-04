'use strict';
Vue.config.debug = true

Vue.component('fate-editor', {
  template: "<b>Yoo Editor</b>"
});

Vue.component('fate-keyboard-key', {
  props: ['key', 'width'],
  template: '<button class="keyboard-key" style="width:' + 100 * this.width + '%">' + this.key + '</button>'
})

Vue.component('fate-keyboard', {
  props: ['side'],
  template: '<div id="fate-keyboard">{{{generate()}}}</div>',
  data: function() {
    return {
      left: [
        [
          ['Esc', 0.16], ['1', 0.12], ['2', 0.12], ['3', 0.12], ['4', 0.12], ['5', 0.12], ['6', 0.12], ['7', 0.12]
        ],
        [
          ['Tab', 0.28], ['Q', 0.12], ['W', 0.12], ['E', 0.12], ['R', 0.12], ['T', 0.12], ['Y', 0.12]
        ],
        [
          ['Toggle', 0.28], ['A', 0.12], ['S', 0.12], ['D', 0.12], ['F', 0.12], ['G', 0.12], ['H', 0.12]
        ],
        [
          ['Shift', 0.28], ['Z', 0.12], ['X', 0.12], ['C', 0.12], ['V', 0.12], ['B', 0.12], ['N', 0.12]
        ],
        [
          ['Mod1', 0.15], ['Mod2', 0.15], ['Mod3', 0.15], ['Mod4', 0.15], ['Space', 0.4]
        ]
      ],
      right: [
        [
          ['7', 0.12], ['8', 0.12], ['9', 0.12], ['0', 0.12], ['-', 0.12], ['=', 0.12], ['\\', 0.14], ['`', 0.14]
        ],
        [
          ['Y', 0.12], ['U', 0.12], ['I', 0.12], ['O', 0.12], ['P', 0.12], ['[', 0.12], [']', 0.12], ['Del', 0.16]
        ],
        [
          ['H', 0.12], ['J', 0.12], ['K', 0.12], ['L', 0.12], [';', 0.12], ['\'', 0.12], ['Enter', 0.28]
        ],
        [
          ['N', 0.12], ['M', 0.12], [',', 0.12], ['.', 0.12], ['/', 0.12], ['Shift', 0.4]
        ],
        [
          ['Space', 0.25], ['Mod5', 0.15], ['Mod6', 0.15], ['Mod7', 0.15], ['Mod8', 0.15], ['Mod9', 0.15]
        ]
      ]
    }
  },
  methods: {
    generate: function() {
      var html = '';
      var keyInfo = this.right;
      if (this.side == 'left') {
        var keyInfo = this.left;
      }
      for (var i = 0; i < keyInfo.length; i++) {
        html += '<div class="keyboard-line">'
        for (var j = 0; j < keyInfo[i].length; j++) {
          html += '<button class="keyboard-key" style="width:' + 100 * keyInfo[i][j][1] + '%">' + keyInfo[i][j][0] + '</button>'
        }
        html += '</div>'
      }
      return html;
    }
  }
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
