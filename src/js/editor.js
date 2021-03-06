'use strict';
// The debug flag should be deleted when publishing.
Vue.config.debug = true

var globalVar = {
    cursor: {
        line : 0,
        col: 0
    },
    editor: {
        content: [['a', 'b','c']],
        shifted: false,
        mode: 'normal',
        layer: 'key',
        ctrl: false,
        modKey: [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ]
    },
    hint: {
        list: [
            ['Error', "line 5: 'scope' is not defined."],
            ['Error', "line 6: 'let' requires for ECMAScript 6."],
            ['Error', "line 7: 'const' requires for ECMAScript 6."],
            ['Warning', "line 22: 'foo' is defined but not use."],
            ['Warning', "line 27: 'bar' is defined but not use."]
        ]},
    keyMap: {
        map: {
            "a": ["a", function() {}, "a", "A"],
            "b": ["b", function() {}, "b", "B"],
            "c": ["c", function() {}, "c", "C"],
            "d": ["d", function() {}, "d", "D"],
            "e": ["e", function() {}, "e", "E"],
            "f": ["f", function() {}, "f", "F"],
            "g": ["g", function() {}, "g", "G"],
            "h": ["h", function() {
                cursorColMove(-1);
            }, "h", "H"],
            "i": ["i", function() {
                globalVar.editor.mode = 'insert';
                //globalVar.editor.content = globalVar.editor.content.slice(0, -1);
                cursorColMove(-1);
            }, "i", "I"],
            "j": ["j", function() {}, "j", "J"],
            "k": ["k", function() {}, "k", "K"],
            "l": ["l", function() {
                cursorColMove(1);
            }, "l", "L"],
            "m": ["m", function() {}, "m", "M"],
            "n": ["n", function() {}, "n", "N"],
            "o": ["o", function() {}, "o", "O"],
            "p": ["p", function() {}, "p", "P"],
            "q": ["q", function() {}, "q", "Q"],
            "r": ["r", function() {
                globalVar.editor.mode = 'replace';
            }, "r", "R"],
            "s": ["s", function() {}, "s", "S"],
            "t": ["t", function() {}, "t", "T"],
            "u": ["u", function() {}, "u", "U"],
            "v": ["v", function() {}, "v", "V"],
            "w": ["w", function() {}, "w", "W"],
            "x": ["x", function() {}, "x", "X"],
            "y": ["y", function() {}, "y", "Y"],
            "z": ["z", function() {}, "z", "Z"],
            "1": ["1", function() {}, "1", "!"],
            "2": ["2", function() {}, "2", "@"],
            "3": ["3", function() {}, "3", "#"],
            "4": ["4", function() {}, "4", "$"],
            "5": ["5", function() {}, "5", "%"],
            "6": ["6", function() {}, "6", "^"],
            "7": ["7", function() {}, "7", "&"],
            "8": ["8", function() {}, "8", "*"],
            "9": ["9", function() {}, "9", "\("],
            "0": ["0", function() {}, "0", "\)"],
            "-": ["-", function() {}, "-", "_"],
            "=": ["=", function() {}, "=", "+"],
            ";": [";", function() {}, ";", ":"],
            "\'": ["\'", function() {}, "\'", "\""],
            "\[": ["\[", function() {}, "\[", "\{"],
            "\]": ["\]", function() {}, "\]", "\}"],
            "\\": ["\\", function() {}, "\\", "|"],
            "\`": ["\`", function() {}, "\\", "\~"],
            ",": [",", function() {}, ",", "\<"],
            ".": [".", function() {}, ".", "\>"],
            "/": ["/", function() {}, "/", "?"],
            "Tab": ["Tab", function() {}, "  ", "    "],
            "Space": ["Space", function() {}, " ", " "],
            "Enter": ["Enter", function() {}, "\n", "\n"],
            "Shift": ["Shift", function() {}, "", ""],
            "Del": ["Del", function() {}, "", ""],
            "Mod1": ["Mod1", function() {}, "", ""],
            "Mod2": ["Mod2", function() {}, "", ""],
            "Mod3": ["Mod3", function() {}, "", ""],
            "Mod4": ["Mod4", function() {}, "", ""],
            "Mod5": ["Mod5", function() {}, "", ""],
            "Mod6": ["Mod6", function() {}, "", ""],
            "Mod7": ["Mod7", function() {}, "", ""],
            "Mod8": ["Mod8", function() {}, "", ""],
            "Mod9": ["Mod9", function() {}, "", ""]
        }}
};

var cursorColMove = function(offset){
    if(globalVar.cursor.col + offset >= 0 && globalVar.cursor.col + offset <= globalVar.editor.content[globalVar.cursor.line].length - 1){
        globalVar.cursor.col += offset;
    }else if(globalVar.cursor.col + offset < 0){
        globalVar.cursor.col = 0;
    }else if(globalVar.cursor.col + offset > globalVar.editor.content[globalVar.cursor.line].length - 1){
        globalVar.cursor.col = globalVar.editor.content[globalVar.cursor.line].length - 1;
    }
}

Vue.component('fate-editor', {
    template: "<div id='edit-area'> <p v-for='line in render()' v-html='line'></p> </div>",
    methods: {
        cat: function(lst, atl){
            var str = '';
            for(var i = 0; i < lst.length; i++){
                if(atl && i == globalVar.cursor.col){
                    str = str + "<span id='cursor-highlight'>" + lst[i] + "</span>";
                }else{
                    str = str + lst[i];
                }
            }
            return str;
        },
        render: function() {
            var tmp = [];
            for(var i = 0; i < globalVar.editor.content.length; i++){
                tmp.push(this.cat(globalVar.editor.content[i], i == globalVar.cursor.line));
            }
            return tmp;
            return globalVar.editor.content.replace(/ /g, '&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').split('\n');
        }
    }
});

Vue.component('fate-keyboard-key', {
    props: ['key1', 'key2', 'width'],
    template: '<button class="keyboard-key" v-on:click="click" v-bind:style="{width:100*width+\'%\'}">{{showKey()}}</button>',
    methods: {
        showKey: function(){
            if(globalVar.editor.shifted){
                return this.key2;
            }else{
                return this.key1;
            }
        },
        getKey: function() {
            return globalVar.keyMap.map[this.key1];
        },
        insert: function(str){
            globalVar.editor.content[globalVar.cursor.line].splice(globalVar.cursor.col,0,str);
        },
        click: function() {
            var key = this.getKey();
            if(this.key1 == 'Toggle'){
                switch(globalVar.editor.layer){
                case 'normal':
                    globalVar.editor.layer = 'fn';
                    break;
                case 'fn':
                    globalVar.editor.layer = 'normal';
                    break;
                default:
                    globalVar.editor.layer = 'normal';
                }
            }else{
                if(globalVar.editor.mode == 'insert'){
                    var keyName;
                    if(globalVar.editor.shifted){
                        keyName = this.key2;
                    }else{
                        keyName = this.key1;
                    }
                    switch (keyName) {
                    case 'Esc':
                        globalVar.editor.mode = 'normal';
                        cursorColMove(-1);
                        break;
                    case 'Tab':
                        this.insert('\t');
                        cursorColMove(1);
                        break;
                    case 'Enter':
                        this.insert('\n');
                        break;
                    case 'Del':
                        globalVar.editor.content[globalVar.cursor.line].splice(globalVar.cursor.col,1);
                        cursorColMove(-1);
                        break;
                    case 'Shift':
                        globalVar.editor.shifted = !globalVar.editor.shifted;
                        break;
                    case 'Space':
                        this.insert(' ');
                        cursorColMove(1)
                        break;
                    default:
                        this.insert(keyName);
                        cursorColMove(1);
                        globalVar.editor.shifted = false;
                    }
                }else if(globalVar.editor.mode == 'normal'){
                    if(key[0] == 'Shift'){
                        globalVar.editor.shifted = !globalVar.editor.shifted;
                    }else{
                        key[1]();
                    }
                }
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

Vue.component('cursor-position',{
    template: '<a href="#">Line: {{currentLine()}} | Col: {{currentCol()}}</a>',
    methods:{
        currentLine: function(){
            return globalVar.cursor.line + "";
        },

        currentCol: function(){
            return globalVar.cursor.col + "";
        }
    }
});

Vue.component('layer-and-mode',{
    template: '<a href="#">Mode : {{currentMode()}} | Layer: {{currentLayer()}}</a>',
    methods:{
        currentMode: function(){
            switch(globalVar.editor.mode){
            case 'insert':
                return 'Insert';
            case 'normal':
                return 'Normal';
            case 'replace':
                return 'Replace';
            case 'visual':
                return 'Visual';
            default:
                return 'Normal';
            }
        },

        currentLayer: function(){
            switch(globalVar.editor.layer){
            case 'normal':
                return 'Normal';
            case 'fn':
                return 'Function';
            default:
                return 'Normal';
            }
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

    var vueApp = new Vue({
        el: '#app',
        data: globalVar
    });
});

$(document).on("keyup", function(e){
    var kc = e.keyCode;
    if(kc == 27){
        globalVar.editor.mode = 'normal';
    }else{
        handleKeyPress(e);
    }
});

var keyCodeToKey = function(kc){
}

var handleKeyPress = function(event){
    if(event.shiftKey){
        globalVar.shifted = true;
    }
}
