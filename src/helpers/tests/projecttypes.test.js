import {retrieveProjectTypes} from "../projecttypes.js"
var assert = require('assert')

describe('test project types', () => {
    it(' Check retrived information', () => {   
        assert.ok(retrieveProjectTypes(),
         [
            { name: "Personal", id: 1, value: "Personal" },
            { name: "Student", id: 2, value: "Student" },
            { name: "Commercial", id: 3, value: "Commercial" },
            { name: "Charity", id: 4, value: "Charity" },
            { name: "Research", id: 5, value: "Research" },
            { name: "Others, please specify below", id: 6, value: "Others" },
          ]
        );   
    }); 
   
 });