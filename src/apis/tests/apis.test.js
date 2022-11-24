import { handleAppMetricsPostRequest } from "../apis";

describe('tests for post funtion for metrics', () => {
    it('test for failure', async () => {
        return handleAppMetricsPostRequest({ timestamps: true },
            "/projects/0/apps/0/logs").then(data => {
                expect(data).toBeFalsy;
        }).catch(error =>{
            expect(error).toBeTruthy;
        })
    }, 10000);     
 });