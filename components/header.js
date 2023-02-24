import Link from "next/link"
import headerStyle from "@/styles/header.module.css"
import useAuth from "@/lib/useAuth"
import { useEffect, useState } from "react"

export default function Header() {

    const {user, logout} = useAuth()

    const [userAuth, setUserAuth] = useState([])
    const [inprogress, setInprogress] = useState(false)

    useEffect(() => {
        user({setUserAuth, setInprogress})
    },[])

    const logoutSubmit = async () => {
        logout({setInprogress})
    }

    return (
        <>

            {inprogress && <div className="loader02"><div></div></div>}


            <header id={headerStyle.header}>
                <div className={`${headerStyle.header} wd`}>
                    <div className={headerStyle.header__logo}>
                        <Link href="/">
                            <img src="../logo.png" alt="wadayef" />
                        </Link>
                    </div>
                    {
                        userAuth.token &&
                            <ul className={headerStyle.header__user__ul__links}>
                                <li className={headerStyle.header__user__links}>
                                    <div className={headerStyle.header__userimg__btn}>
                                        <img src={process.env.NEXT_PUBLIC_FILES_URL+userAuth.image} alt={userAuth.first_name + ' ' + userAuth.last_name} />
                                    </div>
                                    <div className={headerStyle.header__user__dropdown}>
                                        <Link href={`/profile/${userAuth.token}`}>
                                            <div className={headerStyle.header__user__dropdown__link}>
                                                <span>{userAuth.first_name + ' ' + userAuth.last_name}</span>
                                            </div>
                                        </Link>
                                        <Link href="/jobs/new">
                                            <div className={headerStyle.header__user__dropdown__link}>
                                                <span>وظيفة جديدة</span>
                                            </div>
                                        </Link>
                                        <Link href="/profile/edit">
                                            <div className={headerStyle.header__user__dropdown__link}>
                                                <span>تعديل الحساب</span>
                                            </div>
                                        </Link>
                                        <a onClick={logoutSubmit} style={{cursor: 'pointer'}}>
                                            <div className={headerStyle.header__user__dropdown__link}>
                                                <span>تسجيل الخروج</span>
                                            </div>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        ||
                            <ul className={headerStyle.header__ul__login__register}>
                                <li>
                                    <Link href="/login">
                                        <div className={headerStyle.header__login__link}>
                                            <span>دخول</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/register">
                                        <div className={headerStyle.header__register__link}>
                                            <span>ابدأ الآن مجاناً</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                    }
                </div>
            </header>
        </>
    )
}