var feditor_proto = Object.create(HTMLElement.prototype);

feditor_proto.attachedCallback = function() {
    this.innerHTML = "<b>Yoo Editor</b>";
}

var FE = document.registerElement('fate-editor', { prototype: feditor_proto } );

var keyboard_proto = Object.create(HTMLElement.prototype);

keyboard_proto.attachedCallback = function() {
    var option = this.getAttribute('side');
    if(option == 'left'){
        this.innerHTML = "<em>Left Keyboard</em>";
    }else if(option == 'right'){
        this.innerHTML = "<em>Right Keyboard</em>";
    }
}

var FK = document.registerElement('fate-keyboard', { prototype: keyboard_proto } );
