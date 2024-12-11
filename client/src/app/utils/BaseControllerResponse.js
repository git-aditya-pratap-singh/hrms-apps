import { toast } from "react-toastify";
class BaseControllerResponse {

    handleResponse(resp) {
        if (resp.statusCode === 200 && resp.status === true && resp.data !== null) return toast.success(resp.message);
        else if (resp.statusCode === 200 && resp.status === true) return toast.success(resp.message);
        else if (resp.statusCode === 201 && resp.status === false) toast.error(resp.message);
        else if (resp.statusCode === 401) toast.error("You are not authorized for this Actions");
        else if (resp.statusCode === 500) toast.error("SERVER-ERROR!!");
        else return toast.warning("Something went wrong, Please contact to the administrator.");
    }
}

export default BaseControllerResponse;
