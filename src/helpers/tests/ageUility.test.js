import tellAge from "../ageUtility.js"
var assert = require('assert')
    var today = new Date();
    //utctime
    var fiveSecondsAgo = new Date(today.getTime() - 5*(1000)).getTime();
    var aMinuteAgo = new Date(today.getTime() - (1000*60)).getTime();
    var threeMinutesAgo = new Date(today.getTime() - 3*(1000*60)).getTime();
    var yesterday = new Date(today.getTime() - (1000*60*60*24)).getTime();
    var twodayago = new Date(today.getTime() - 2*(1000*60*60*24)).getTime();
    var hourago = new Date(today.getTime() - (1000*60*60)).getTime();
    var twohoursago = new Date(today.getTime() - 2*(1000*60*60)).getTime();
    //null case
    var nullTime = new Date(today.getTime() + (1000*60*60)).getTime();

describe('tell age helpler', () => {
    it('test null case', () => {
            assert.equal(tellAge(0), null);
            assert.equal(tellAge(nullTime), null);
    });    
    it('test secondds in the past', () => {
        assert.equal(tellAge(fiveSecondsAgo), '5 seconds ago');
    });
    it('test minutes in the past', () => {
        assert.equal(tellAge(aMinuteAgo), '1 minute ago');
        assert.equal(tellAge(threeMinutesAgo), '3 minutes ago');
    }); 
    it('test hours past', () => {
        assert.equal(tellAge(hourago),'1 hour ago');
        assert.equal(tellAge(twohoursago), '2 hours ago');
    }); 
    it('test  days ago', () => {
        assert.equal(tellAge(yesterday), '1 day ago');   
        assert.equal(tellAge(twodayago), '2 days ago'); 
    }); 
   
 });