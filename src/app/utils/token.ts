export const getToken = () => {
    let token = localStorage.getItem('token');

    if (token != "undefined") {
        return token;
    } else {
        return null;
    }
}