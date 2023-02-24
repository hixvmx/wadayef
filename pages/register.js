import Head from "@/components/metatags"
import Master from "@/layouts/master"
import Link from "next/link"
import useAuth from "@/lib/useAuth"
import { useState } from "react"
import registerStyle from "@/styles/register.module.css"


export default function Register() {

    const {register} = useAuth({middleware: 'guest'})

    const [firstname,   setFirstname]  =  useState('')
    const [lastname,     setLastname]  =  useState('')
    const [email,           setEmail]  =  useState('')
    const [password,     setPassword]  =  useState('')
    const [errors,         setErrors]  =  useState([])
    const [inprogress, setInprogress]  =  useState(false)

    const registerSubmit = async (e) => {
        e.preventDefault()

        register({setErrors, setInprogress, firstname, lastname, email, password})
    }

    return (
        <>
            <Head 
                title="إنشاء حساب"
                description="وصف الموقع"
                keywords="الكلمات المفتاحية للموقع"
            />
            <section className={registerStyle.register__section}>
                <div className="wd">
                    <div className={registerStyle.register__form}>
                        <form onSubmit={registerSubmit} autoComplete="off">
                            <div className={registerStyle.form__title}>
                                <h1>إنشاء حساب جديد</h1>
                            </div>

                            {
                                errors.danger
                                &&
                                    <div className={registerStyle.errorMessage}>
                                        <p>{errors.danger}</p>
                                    </div>

                                ||

                                errors.success
                                &&
                                    <div className={registerStyle.successMessage}>
                                        <p>{errors.success}</p>
                                    </div>
                            }
                            
                            <div className={registerStyle.form__group}>
                                <span>الإسم الشخصي <i>*</i></span>
                                <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" autoComplete="off" />
                                {
                                    errors.firstname &&
                                        <p>{errors.firstname}</p>
                                }
                            </div>

                            <div className={registerStyle.form__group}>
                                <span>الإسم العائلي <i>*</i></span>
                                <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" autoComplete="off" />
                                { errors.lastname && <p>{errors.lastname}</p> }
                            </div>

                            <div className={registerStyle.form__group}>
                                <span>البريد الإلكتروني <i>*</i></span>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" autoComplete="off" />
                                { errors.email && <p>{errors.email}</p> }
                            </div>

                            <div className={registerStyle.form__group}>
                                <span>كلمة المرور <i>*</i></span>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="off" />
                                { errors.password && <p>{errors.password}</p> }
                            </div>

                            <div className={registerStyle.form__btn}>
                                <button type="submit">إنشاء حساب</button>
                            </div>

                            <div className={registerStyle.form__footer}>
                                <p>هل لديك حساب؟ <Link href="/login">تسجيل الدخول</Link></p>
                            </div>
                            
                            {
                                inprogress &&
                                    <div className="loader"><div></div></div>
                            }
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

Register.getLayout = function getLayout(page) {
    return <Master>{page}</Master>
}