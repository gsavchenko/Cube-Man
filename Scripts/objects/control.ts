/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public points: objects.Point[];
        public mesh: Object3D;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(mesh: Object3D) {
            this.points = new Array<objects.Point>();
            this.mesh = mesh;
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        public clone(): void {
            var materials = [
                new THREE.MeshLambertMaterial({ opacity: 0.6, color: 0xff44ff, transparent: true }),
                new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
            ];

            var mesh2 = THREE.SceneUtils.createMultiMaterialObject(customGeometry, materials);
            mesh2.children.forEach(function(child) {
                child.castShadow = true
            });  
            mesh2.translateX(5);
            mesh2.translateZ(5);
            mesh2.name = "clone";
            scene.remove(scene.getObjectByName("clone"));
            scene.add(mesh2);
        }
    }
}
