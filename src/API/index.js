import axios from "axios";
import constantsState from "../store/globalConstants";

axios.defaults.withCredentials = true;

export async function AxiosGet(partUrl, URLParams) {
    return await axios.get(constantsState.api + partUrl, {
        params: URLParams,
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
        },
        validateStatus: () => true,
    })
    .then(response => {return response})
    .catch(error => {
        console.log("error(AxiosGet)\n", error);
        return error;
      });
    
}

export async function AxiosPost(partUrl, data, URLParams) {
    return await axios.post(constantsState.api + partUrl, JSON.stringify(data),{
        params: URLParams,
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
        },
        validateStatus: () => true,
    })
    .then((response) => {return response; })
    .catch((error) => {
        console.log("error(AxiosPost)\n", error.toJSON());
        return error;
      });
}

export async function AxiosFormPost(partUrl, data) {
    return await axios.post(constantsState.api + partUrl, data,{
        headers: {
            'ngrok-skip-browser-warning': 'true',
        },
        validateStatus: () => true,
    })
    .then((response) => {return response; })
    .catch((error) => {
        console.log("error(AxiosFormPost)\n", error.toJSON());
        return error;
      });
}

export async function AxiosFormPut(partUrl, data) {
    return await axios.put(constantsState.api + partUrl, data,{
        headers: {
            'ngrok-skip-browser-warning': 'true',
        },
        validateStatus: () => true,
    })
    .then((response) => {return response; })
    .catch((error) => {
        console.log("error(AxiosFormPut)\n", error.toJSON());
        return error;
      });
}

export async function AxiosDelete(partUrl, URLParams) {
    return await axios.delete(constantsState.api + partUrl, {
        params: URLParams,
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
        },
        validateStatus: () => true,
    })
    .then(response => {return response})
}
