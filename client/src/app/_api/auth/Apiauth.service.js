import ApiService from '../../_service/api.service';
import BaseControllerResponse from '../../utils/BaseControllerResponse';

class Apiauth extends BaseControllerResponse {

    Registration = async (formData) => {
        try {
            const response = await new ApiService().post("/auth-registration/registration", formData);
            this.handleResponse(response);
            return response;
        } catch (err) {
            return this.handleResponse(err);
        }
    }

    login = async (formData) => {
        try {
            const response = await new ApiService().post("/auth-login/login", formData);
            this.handleResponse(response);
            return response;
        } catch (err) {
            return this.handleResponse(err);
        }
    }

    logout = async () => {
        try {
            const response = await new ApiService().post("/auth-login/logout", {});
            this.handleResponse(response);
            return response;
        } catch (err) {
            return this.handleResponse(err);
        }
    }

    getsessionToken = async () => {
        try {
            const response = await new ApiService().get("/auth-login/sessionToken");
            return response;
        } catch (err) {
            return this.handleResponse(err);
        }
    }

}

export default Apiauth;
