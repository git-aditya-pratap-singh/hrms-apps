import ApiService from '../../_service/api.service';
import BaseControllerResponse from '../../utils/BaseControllerResponse';

class ApplicationApi extends BaseControllerResponse {

    AddCandidates = async (formData) => {
        try {
            const response = await new ApiService().uploadFileWithData("/dashboard/candidates/add", formData);
            this.handleResponse(response);
            return response;
        } catch (err) {
            return this.handleResponse(err);
        }
    }

    DeleteCandidates = async (email) => {
        const dataEmail = {'Email': email}
        try {
            const response = await new ApiService().post("/dashboard/candidates/delete", dataEmail);
            this.handleResponse(response);
            return response;
        } catch (err) {
            return this.handleResponse(err);
        }
    }

    EditCandidateStatus = async (email,status) => {
        const dataEmail = {'email': email, 'status': status}
        try {
            const response = await new ApiService().put("/dashboard/candidates/edit", dataEmail);
            this.handleResponse(response);
            return response;
        } catch (err) {
            return this.handleResponse(err);
        }
    }

    AddEmployee = async (data, status) => {
        const formData = {'data': data, 'status': status}
        try {
            const response = await new ApiService().post("/dashboard/candidates/addEmployee", formData);
            this.handleResponse(response);
            return response;
        } catch (err) {
            return this.handleResponse(err);
        }
    }

    UpdateAttendance = async (email, status) => {
        const dataEmail = {'email': email, 'status': status}
        try {
            const response = await new ApiService().put("/dashboard/attendance/edit", dataEmail);
            this.handleResponse(response);
            return response;
        } catch (err) {
            return this.handleResponse(err);
        }
    }

}

export default ApplicationApi;
