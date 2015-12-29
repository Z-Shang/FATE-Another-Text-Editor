var feditor_proto = Object.create(HTMLElement.prototype);

feditor_proto.attachedCallback = function() {
    this.innerHTML = "<b>Yoo Editor</b>";
}

var FE = document.registerElement('fate-editor', { prototype: feditor_proto } );
