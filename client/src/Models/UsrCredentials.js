import { extendObservable } from 'mobx'

class UsrModel {
    constructor() {
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            userName: '',
            roles: '',
        });
    }
}

export default new UsrModel();