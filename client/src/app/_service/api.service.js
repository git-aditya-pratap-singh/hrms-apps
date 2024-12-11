import axios from "axios";
import environmentURL from "../_environments/environments";
//import Cookies from 'js-cookie';
class ApiService {

    constructor() {
        this.api = (upload) => axios.create({
            baseURL: environmentURL.apiUrl,
            withCredentials: true,
            headers: {
                'Content-Type': upload ? 'multipart/form-data' : 'application/json',
                'Accept': 'application/json, multipart/form-data'
            },
        });
    }
    async request(method, url, data = null, params = null,upload=null) {
        try {
            const response = await this.api(upload).request({
                method,
                url,
                data,
                params,
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }
    async get(url, params = null) {
        return this.request('GET', url, null, params);
    }
    async post(url, data) {
        return this.request('POST', url, data, null);
    }
    async put(url, data) {
        return this.request('PUT', url, data, null);
    }
    async delete(url, data = null) {
        return this.request('DELETE', url, data, null);
    }
    async uploadFile(url, data) {
        return this.request('POST', url, data, null, true);
    }
    async uploadFileWithData(url, data) {
        return this.request('POST', url, data, null, true);
    }
    handleError(error) {
        console.error('API Error:', error);
        throw error; 
    }
}

export default ApiService;
