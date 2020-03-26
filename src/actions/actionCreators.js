import axios from 'axios';
import { APP_DATA, POST_DATA } from './actionsTypes';
import { POST_DATA_URL } from '../helpers/urlConst';

export const requestAppData = appData => ({ type: APP_DATA, data: appData });

const HeaderConst = {
    CONTENT_TYPE: 'Content-Type',
    APPLICATION_JSON: 'application/json'
};

export const postToServer = (object) => {
    return (dispatch) => {
        console.log('postToServer Request', object, POST_DATA_URL);
        axios.post(POST_DATA_URL, JSON.stringify(object), {
            headers: { [HeaderConst.CONTENT_TYPE]: [HeaderConst.APPLICATION_JSON] }
        })
            .then(({ data }) => {
                console.log('createNewProject Fetch Response', data);
                if (data.success) {
                    // callback(null, data);
                    dispatch({
                        type: POST_DATA,
                        data
                    });
                } else {
                    // callback(data.message, null);
                    dispatch({
                        type: POST_DATA,
                        data
                    });
                }
            })
            .catch(error => {
                console.log('createNewProject Fetch Error', error);
                // handleApiError(error, callback);
                dispatch({
                    type: POST_DATA,
                    data: { error }
                });
            });
    };
}