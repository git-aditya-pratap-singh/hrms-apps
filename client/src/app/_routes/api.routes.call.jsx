import ApiService from "../_service/api.service";

const API_INSTANCE = new ApiService();

class ApiRoutesCall {

    CandidatesPageApi = async() =>{
        try{
            const response = await new ApiService().get('/dashboard/candidates/fetchData');
            return response.status === true ? response.data : 0;
        }catch(err){
            return 0;
        }
    }


    EmployeePageApi = async() =>{
        try{
            const response = await new ApiService().get('/dashboard/employee/fetchData');
            return response.status === true ? response.data : 0;
        }catch(err){
            return 0;
        }
    }
}
export default ApiRoutesCall;