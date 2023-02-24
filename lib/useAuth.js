import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "./axios";
import useCookies from "./useCookies";


export default function useAuth({middleware} = {}) {


    const route = useRouter()


    const {setCookie, getCookie, removeCookie} = useCookies()


    const csrf = () => axios.get('/sanctum/csrf-cookie')


    useEffect(() => {
        if (middleware == 'guest' && getCookie('auth')) route.push('/')
        if (middleware == 'auth' && !getCookie('auth')) route.push('/login')
    })


    const user = async ({setUserAuth, setInprogress}) => {
        setInprogress(true)

        await csrf()

        if (getCookie('auth')) {
            axios
                .get('/api/auth/user', {
                    headers: {
                        Authorization: `Bearer ${getCookie('auth')}`
                    }
                })
                .then((res) => {
                    setInprogress(false)
                    setUserAuth(res.data)
                })
                .catch((error) => {
                    setInprogress(false)
                    removeCookie('auth')
                    window.location.href = '/login'
                })
        } else {
            setInprogress(false)
            setUserAuth([])
        }
    }


    const register = async ({setErrors, setInprogress, ...props}) => {
        setErrors([])
        setInprogress(true)

        await csrf()

        axios
            .post('/api/auth/register', props)
                .then(({ data }) => {
                    setInprogress(false)
                    if (data.status == 1) {
                        setErrors({'success': data.result})
                        route.push('/login')
                    } else {
                        setErrors({'danger': data.result})
                    }
                })
                .catch(({ response }) => {
                    setInprogress(false)
                    if (response.status == 422) {
                        setErrors(response.data.errors)
                    } else {
                        setErrors({'danger': response.data.message})
                    }
                })
    }


    const login = async ({setErrors, setInprogress, ...props}) => {
        setErrors([])
        setInprogress(true)

        await csrf()

        axios
            .post('/api/auth/login', props)
            .then(({ data }) => {
                setInprogress(false)
                if (data.status == 1) {
                    setErrors({'success': data.result})
                    setCookie('auth', data.token)
                    window.location.href = '/'
                } else {
                    setErrors({'danger': data.result})
                }
            })
            .catch(({ response }) => {
                setInprogress(false)
                if (response.status == 422) {
                    setErrors(response.data.errors)
                } else {
                    setErrors({'danger': response.data.message})
                }
            })
    }


    const logout = async ({setInprogress}) => {
        setInprogress(true)

        await csrf()

        axios
            .get('/api/auth/logout', {
                headers: {
                    Authorization: `Bearer ${getCookie('auth')}`
                }
            })
            .then(({ data }) => {
                if (data.status == 1) {
                    removeCookie('auth')
                    window.location.href = '/login'
                }
            })
    }


    return {
        csrf,
        register,
        login,
        logout,
        user
    }
}