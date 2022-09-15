import {
    subtractTime,
    formatMemoryMetrics,
    formatCPUMetrics,
    formatNetworkMetrics,
    formatAppMemoryMetrics,
    formatAppCPUMetrics,
    formatAppNetworkMetrics,
} from "../formatMetrics"
var assert = require('assert')


describe('Test metrics formatting', () => {
    it('test subtract time  functions', () => {
            assert.equal(subtractTime(1662930000,1),1662843600);
    }); 
    it('test cpu metrics  functions', () => {
       assert.ok(formatCPUMetrics(1,[{project:1,
         metrics:[{timestamp:1662930000,value:102400000}]}]), 
         [{"cpu": 1024000000, "time": "00:00"}]);
         assert.ok(formatAppCPUMetrics(1,[{project:1,
         metrics:[{timestamp:1662930000,value:102400000}]}]), 
         [{"cpu": 1024000000, "time": "00:00"}]);
     }); 
     it('test memory metrics  functions', () => {
        assert.ok(formatMemoryMetrics(1,[{project:1,
          metrics:[{timestamp:1662930000,value:1024000000}]}]), 
          [{"memory": 1024, "time": "00:00"}]);
          assert.ok(formatAppMemoryMetrics(1,[{project:1,
            metrics:[{timestamp:1662930000,value:1024000000}]}]), 
            [{"memory": 1024, "time": "00:00"}]);
      }); 
      it('test network metrics  functions', () => {
        assert.ok(formatNetworkMetrics(1,[{project:1,
          metrics:[{timestamp:1662930000,value:1024000000}]}]), 
          [{"network": 1024, "time": "00:00"}]);
          assert.ok(formatAppNetworkMetrics(1,[{project:1,
            metrics:[{timestamp:1662930000,value:1024000000}]}]), 
            [{"network": 1024, "time": "00:00"}]);
      });
});