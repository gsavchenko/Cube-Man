/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(mesh) {
            this.points = new Array();
            this.mesh = mesh;
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.clone = function () {
            var materials = [
                new THREE.MeshLambertMaterial({ opacity: 0.6, color: 0xff44ff, transparent: true }),
                new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
            ];
            var mesh2 = THREE.SceneUtils.createMultiMaterialObject(customGeometry, materials);
            mesh2.children.forEach(function (child) {
                child.castShadow = true;
            });
            mesh2.translateX(5);
            mesh2.translateZ(5);
            mesh2.name = "clone";
            scene.remove(scene.getObjectByName("clone"));
            scene.add(mesh2);
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map