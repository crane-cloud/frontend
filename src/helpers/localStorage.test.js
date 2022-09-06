import {saveState,loadState,onUnload} from "./localStorage.js"
var assert = require('assert')

// storage mock should be implemented further
describe('lite local storage test', () => {
    it('to be defined items', () => {   
        expect(saveState).toBeDefined();
        expect(loadState).toBeDefined();
        expect(onUnload).toBeDefined();
    });   
 });