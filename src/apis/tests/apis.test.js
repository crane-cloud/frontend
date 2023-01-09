import { handlePostRequestWithDataObject,
     handlePatchRequest,
      handleGetRequest,
       handleDeleteRequest,
       handlePostRequestWithOutDataObject
    } from "../apis";
//setting to 30 second timeouts
describe('tests for post funtion for metrics', () => {
    it('test for failure of post request', async () => {
        return handlePostRequestWithDataObject({ timestamps: true },
            "/projects/0/apps/0/logs").then(data => {
                expect(data).toBeFalsy;
        }).catch(error =>{
            expect(error).toBeTruthy;
        })
    }, 30000);   
    it('test for failure of get request', async () => {
        return handleGetRequest(
            "/projects/0/users").then(data => {
                expect(data).toBeFalsy;
        }).catch(error =>{
            expect(error).toBeTruthy;
        })
    }, 30000);  
    it('test for failure of patch request', async () => {
        return handlePatchRequest(
            `/projects/0/users/handle_invite`,
    {"accepted_collaboration_invite": true}).then(data => {
                expect(data).toBeFalsy;
        }).catch(error =>{
            expect(error).toBeTruthy;
        })
    }, 30000);    
    it('test for failure of delete request', async () => {
        return handleDeleteRequest(
            `/projects/0/users`,
            {data:{email: "email"}}).then(data => {
                expect(data).toBeFalsy;
        }).catch(error =>{
            expect(error).toBeTruthy;
        })
    }, 30000);  
    it('test for failure of post with data enclosure object', async () => {
        return handlePostRequestWithOutDataObject({ timestamps: true },
            "/projects/0/apps/0/logs").then(data => {
                expect(data).toBeFalsy;
        }).catch(error =>{
            expect(error).toBeTruthy;
        })
    }, 30000);  
 });