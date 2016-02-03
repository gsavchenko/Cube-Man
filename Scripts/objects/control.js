/// <reference path="../../typings/tsd.d.ts"/>
/*
    Source file	name:       control.ts
    Author’s name:	        George Savcheko
    Last modified by:       George Savchenko
    Date last modified:     2016-02-02
    Program	description:    Display a cube like humanoid character
    Revision history:       added rotationSpeed to control class
*/
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed) {
            this.rotationSpeed = rotationSpeed;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map