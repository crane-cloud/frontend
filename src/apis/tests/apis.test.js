import { handlePostRequestWithDataObject, handlePatchRequest, handleGetRequest } from "../apis";

describe('tests for post funtion for metrics', () => {
    it('test for failure of post request', async () => {
        return handlePostRequestWithDataObject({ timestamps: true },
            "/projects/0/apps/0/logs").then(data => {
                expect(data).toBeFalsy;
        }).catch(error =>{
            expect(error).toBeTruthy;
        })
    }, 8000);   
    it('test for failure of get request', async () => {
        return handleGetRequest(
            "/projects/0/users").then(data => {
                expect(data).toBeFalsy;
        }).catch(error =>{
            expect(error).toBeTruthy;
        })
    }, 7000);  
    it('test for failure of patch request', async () => {
        return handlePatchRequest(
            `/projects/0/users/handle_invite`,
    {"accepted_collaboration_invite": true}).then(data => {
                expect(data).toBeFalsy;
        }).catch(error =>{
            expect(error).toBeTruthy;
        })
    }, 7000);    
 });