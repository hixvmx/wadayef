import Head from "@/components/metatags"
import Master from "@/layouts/master"
import Link from "next/link"
import useAuth from "@/lib/useAuth"
import loginStyle from "@/styles/login.module.css"
import { useState } from "react"


export default function Login() {

    const {login} = useAuth({middleware: 'guest'});

    const [email,           setEmail]  =  useState('hicham.dev@gmail.com')
    const [password,     setPassword]  =  useState('12345')
    const [errors,         setErrors]  =  useState([])
    const [inprogress, setInprogress]  =  useState(false)

    const loginSubmit = async (e) => {
        e.preventDefault()

        login({setErrors, setInprogress, email, password})
    }

    return (
        <>
            <Head 
                title="تسجيل الدخول"
                description="وصف الموقع"
                keywords="الكلمات المفتاحية للموقع"
            />
            <section className={loginStyle.login__section}>
                <div className="wd">
                    <form onSubmit={loginSubmit} autoComplete="off">
                        <div className={loginStyle.login__form}>
                            <div className={loginStyle.form__title}>
                                <h1>تسجيل الدخول</h1>
                            </div>

                            {
                                errors.danger
                                &&
                                    <div className={loginStyle.errorMessage}>
                                        <p>{errors.danger}</p>
                                    </div>

                                ||

                                errors.success
                                &&
                                    <div className={loginStyle.successMessage}>
                                        <p>{errors.success}</p>
                                    </div>
                            }

                            <div className={loginStyle.form__group}>
                                <span>البريد الإلكتروني</span>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" autoComplete="off" />
                                { errors.email && <p>{errors.email}</p> }
                            </div>

                            <div className={loginStyle.form__group}>
                                <span>كلمة المرور</span>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" autoComplete="off" />
                                { errors.password && <p>{errors.password}</p> }
                            </div>

                            <div className={loginStyle.form__btn}>
                                <button type="submit">تسجيل الدخول</button>
                            </div>

                            <div className={loginStyle.form__footer}>
                                <p>ليس لديك حساب؟ <Link href="/register">إنشاء حساب</Link></p>
                            </div>

                            {
                                inprogress &&
                                    <div className="loader"><div></div></div>
                            }
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

Login.getLayout = function getLayout(page) {
    return <Master>{page}</Master>
}