import Head from "@/components/metatags"
import Master from "@/layouts/master"
import editProfileStyle from "@/styles/profile/editprofile.module.css"
import axios from "@/lib/axios"
import { useState } from "react"
import useAuth from "@/lib/useAuth"
import useCookies from "@/lib/useCookies"


export default function EditProfile({myinformation}) {

    useAuth({middleware: 'auth'})

    const {getCookie} = useCookies()

    const v = myinformation;
    const [firstname,   setFirstname] = useState(v.first_name)
    const [lastname,     setLastname] = useState(v.last_name)
    const [bio,               setBio] = useState(v.bio)
    const [facebook,     setFacebook] = useState(v.facebook)
    const [twitter,       setTwitter] = useState(v.twitter)
    const [instagram,   setInstagram] = useState(v.instagram)
    const [image,           setImage] = useState('')
    const [imgPreview, setImgPreview] = useState(process.env.NEXT_PUBLIC_FILES_URL+myinformation.image)
    
    const [errors,         setErrors] = useState([])
    const [inprogress, setInprogress] = useState(false)

    const changehandler = (e) => {
        const img = e.target.files[0];
        setImage(img)
        setImgPreview(URL.createObjectURL(img))
    }

    const editSubmit = async (e) => {
        e.preventDefault()

        setErrors([])
        setInprogress(true)

        const editProfile = new FormData()
        editProfile.append('firstname', firstname)
        editProfile.append('lastname', lastname)
        editProfile.append('bio', bio)
        editProfile.append('facebook', facebook)
        editProfile.append('twitter', twitter)
        editProfile.append('instagram', instagram)
        editProfile.append('image', image)

        await
            axios
                .post('/api/profile/edit', editProfile, {
                    headers: {
                        Authorization: `Bearer ${getCookie('auth')}`
                    }
                })
                .then(({ data }) => {
                    setInprogress(false)
                    if (data.status == 1) {
                        setErrors({'success': data.result})
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

    return (
        <>
            <Head
                title='تعديل الحساب'
                description="user bio"
                keywords="user keywords"
            />
            
            <section className={editProfileStyle.section__profile}>
                <div className="wd">
                    <div className={editProfileStyle.profile__box}>
                        <form onSubmit={editSubmit}>
                            
                            <div className={editProfileStyle.profile__img}>
                                <img src={imgPreview} alt={firstname+' '+lastname} />
                                <label htmlFor="userimg">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.02693 18.329C4.18385 19.277 5.0075 20 6 20H18C19.1046 20 20 19.1046 20 18V14.1901M4.02693 18.329C4.00922 18.222 4 18.1121 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V14.1901M4.02693 18.329L7.84762 14.5083C8.52765 13.9133 9.52219 13.8482 10.274 14.3494L10.7832 14.6888C11.5078 15.1719 12.4619 15.1305 13.142 14.5865L15.7901 12.4679C16.4651 11.9279 17.4053 11.8856 18.1228 12.3484C18.2023 12.3997 18.2731 12.4632 18.34 12.5302L20 14.1901M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </label>
                                <input onChange={changehandler} type="file" id="userimg" accept="image/png, image/jpg, image/jpeg" hidden />
                            </div>

                            <div className={editProfileStyle.edit__form__names}>
                                <div className={editProfileStyle.edit__form__group}>
                                    <span>الإسم الشخصي</span>
                                    <input onChange={(e) => setFirstname(e.target.value)} value={firstname} type="text" />
                                    {errors.firstname && <p>{errors.firstname}</p>}
                                </div>
                                <div className={editProfileStyle.edit__form__group}>
                                    <span>الإسم العائلي</span>
                                    <input onChange={(e) => setLastname(e.target.value)} value={lastname} type="text" />
                                    {errors.lastname && <p>{errors.lastname}</p>}
                                </div>
                            </div>

                            <div className={editProfileStyle.edit__form__group}>
                                <span>السيرة الذاتية</span>
                                <textarea onChange={(e) => setBio(e.target.value)} value={bio}></textarea>
                                {errors.bio && <p>{errors.bio}</p>}
                            </div>

                            <div className={editProfileStyle.edit__form__group}>
                                <span>رابط فيسبوك</span>
                                <input onChange={(e) => setFacebook(e.target.value)} value={facebook} type="text" />
                                {errors.facebook && <p>{errors.facebook}</p>}
                            </div>

                            <div className={editProfileStyle.edit__form__group}>
                                <span>رابط تويتر</span>
                                <input onChange={(e) => setTwitter(e.target.value)} value={twitter} type="text" />
                                {errors.twitter && <p>{errors.twitter}</p>}
                            </div>

                            <div className={editProfileStyle.edit__form__group}>
                                <span>رابط إنستغرام</span>
                                <input onChange={(e) => setInstagram(e.target.value)} value={instagram} type="text" />
                                {errors.instagram && <p>{errors.instagram}</p>}
                            </div>

                            {
                                errors.danger
                                &&
                                    <div className={editProfileStyle.errorMessage}>
                                        <p>{errors.danger}</p>
                                    </div>

                                ||

                                errors.success
                                &&
                                    <div className={editProfileStyle.successMessage}>
                                        <p>{errors.success}</p>
                                    </div>
                            }

                            <div className={editProfileStyle.edit__form__btn}>
                                <button type="submit">حفظ</button>
                            </div>

                        </form>
                        {
                            inprogress &&
                                <div className="loader"><div></div></div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

EditProfile.getLayout = function getLayout(page) {
    return (<Master>{page}</Master>)
}

export async function getServerSideProps(context) {
    const authToken = await context.req.cookies['auth'];

    const response = await axios.get('/api/auth/user',{
                                        headers: {
                                            Authorization: authToken ? `Bearer ${authToken}` : ''
                                        }
                                    })

    return {
        props: {
            myinformation: response.data
        }
    }
}