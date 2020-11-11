import { extendObservable } from 'mobx';

class UserStore {
    constructor() {
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            userId: 0,
            username: ''
        })
    }
}
export default new UserStore();