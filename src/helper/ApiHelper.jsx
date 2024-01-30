import axios from 'axios';
import LocalStorage from './LocalStorage';

const url = 'http://212.51.192.46:2002/api2/';

class ApiHelper {
    static fetchCsrfToken = async () => {
        try {
            const response = await axios.post(
                `${url}auth-token/`,
                new URLSearchParams({
                    'username': 'a@example.com',
                    'password': '123'
                })
            );
            return response;
        } catch (error) {
            console.error('Error when retrieving CSRF token:', error)
            throw error;
        }
    }

    static Login = async (csrfToken) => {
        try {
            const response = await axios.get(`${url}client-login/`, {
                headers: {
                    'Authorization': `Token ${csrfToken}`
                }
            });
            return response;
        } catch (error) {
            console.error('Error when login:', error);
            throw error;
        }
    }

    static fetchLoggedUser = async (csrfToken) => {
        try {
            const response = await axios.get(`${url}account/info/`, {
                headers: {
                    'Authorization': `Token ${csrfToken}`,
                    'Accept': 'application/json; indent=4'
                }
            });
            return response;
        } catch (error) {
            console.error('Error when getting logged user information:', error);
            throw error;
        }
    }
}

export default ApiHelper;