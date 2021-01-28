import UsrModel from '../../Models/UsrCredentials';

const LoggedIn = async () => {

    try {

        var url = '/isLoggedIn'

        let res = await fetch(url, {
            method: 'post',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
        });

        let result = await res.json();

        if (result && result.success) {

            UsrModel.userName = result.userName;
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
