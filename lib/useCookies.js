import Cookies from "js-cookie";



export default function useCookies() {
    
    // set
    const setCookie = (cookieName, cookieValue) => {
        Cookies.set(cookieName, cookieValue, {
            expires: new Date(2147483647 * 1000),
            secure: true,
            sameSite: 'strict',
            path: '/'
        });
    }

    
    // get
    const getCookie = (cookieName) => {
        return Cookies.get(cookieName)
    }


    // remove
    const removeCookie = (cookieName) => {
        Cookies.remove(cookieName)
    }


    return {
        setCookie,
        getCookie,
        removeCookie
    }
}