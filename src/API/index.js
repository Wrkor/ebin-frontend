import axios from "axios";
import constantsState from "../store/globalConstants";

export async function AxiosGet(partUrl, URLParams) {
    return await axios.get(constantsState.api + partUrl, JSON.stringify(URLParams), {
        headers: {
            'Content-Type': 'application/json',
        },
        validateStatus: () => true,
    })
    .then(response => {return response})
    .catch(error => {
        console.log("error(AxiosGet)\n", error.toJSON());
        return error;
      });
    
}

export async function AxiosPost(partUrl, data) {
    return await axios.post(constantsState.api + partUrl, JSON.stringify(data),{
        headers: {
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
