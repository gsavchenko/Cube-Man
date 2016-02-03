/// <reference path="../../typings/tsd.d.ts"/>

/*
    Source file	name:       control.ts
    Author’s name:	        George Savcheko
    Last modified by:       George Savchenko
    Date last modified:     2016-02-02
    Program	description:    Display a cube like humanoid character
    Revision history:       added rotationSpeed to control class
*/

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public rotationSpeed:number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeed:number) {
           this.rotationSpeed = rotationSpeed;
        }
    }
}
