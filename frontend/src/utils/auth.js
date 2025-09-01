import api from "./api"

let cachedUser = null ;
let lastCheck = 0;

const checkAuth = async()=> {

    if ( Date.now() - lastCheck < 300000) {
        return cachedUser;
    }

    try {
        const res = await api.get('/api/me');
        cachedUser =res.data.user;
        lastCheck = Date.now();
        return cachedUser;
    } catch (error) {
        cachedUser = null;
        return null;
    }
}

export default checkAuth;