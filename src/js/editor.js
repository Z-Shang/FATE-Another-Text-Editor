var editor_proto = Object.create(HTMLElement.prototype);

editor_proto.attachedCallback = function() {
    var nodes = document.querySelectorAll("fate-editor");
    for(var i = 0; i < nodes.length; i++){
        nodes[i].innerHTML = "<b>Yoo Editor</b>";
    }
}

var editor = document.registerElement("fate-editor", { prototyp: editor_proto} );

function gen_editor() {
    var rootElement;
    if(document.querySelectorAll) {
        rootElement = document.querySelectorAll("html, body, div");
    } else {
        rootElement = null;
    }
}

document.addEvenListener("DOMContentLoaded", gen_editor, false);
