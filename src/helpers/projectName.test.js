import {getProjectName,
    getProjectDescription,
    getDateCreated, 
    getUser, 
    avatarName} from "./projectName.js"
var assert = require('assert')


describe('tests for name functions', () => {
    it('returns first letter of the name', () => {
            assert.equal(avatarName("khali"), "K");
    });     
    it('gets name of a project', () => {
        assert.equal(getProjectName([{id:1,name:"p1"},{id:2,name:"p1h"}],1),
        "p1");
    }); 
    it('gets description of a project', () => {
        assert.equal(getProjectDescription([{id:1,description:"p1"},{id:2,description:"p1h"}],2),
        "p1h");
    }); 
    it('gets creation date of a project', () => {
        assert.equal(getDateCreated([{id:1,date_created:"p1"},{id:2,date_created:"p1h"}],2),
        "p1h");
    });
    it('gets user', () => {
        assert.ok(getUser([{id:1,date_created:"p1"},{id:2,date_created:"p1h"}],2),
        {id:2,date_created:"p1h"});
    });

 });