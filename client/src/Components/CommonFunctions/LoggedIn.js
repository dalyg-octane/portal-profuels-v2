import UsrModel from '../../Models/UsrCredentials';
import axios from 'axios'

const LoggedIn = async () => {

    try {
        const { data } = await axios.post(`/isLoggedIn`, {});
        if (data && data.success) {
            UsrModel.userName = data.userName;
            UsrModel.loading = false;
            UsrModel.isLoggedIn = true;
        } else {
            UsrModel.loading = false;
            UsrModel.isLoggedIn = false;
        }
    } catch (e) {
        UsrModel.loading = false;
        UsrModel.isLoggedIn = false;
    }

}

export default LoggedIn
