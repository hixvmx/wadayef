import Head from "@/components/metatags"
import Master from "@/layouts/master"
import axios from "@/lib/axios"
import useAuth from "@/lib/useAuth"
import useCookies from "@/lib/useCookies"
import newJobStyle from "@/styles/jobs/new.module.css"
import { useState } from "react"



export default function NewJob({categoriesx, typesx, salariesx}) {

    useAuth({middleware: 'auth'})

    const {getCookie} = useCookies()

    const [title,             setTitle] = useState('')
    const [category,       setCategory] = useState('')
    const [type,               setType] = useState('')
    const [salary,           setSalary] = useState('')
    const [description, setDescription] = useState('')
    const [skills,           setSkills] = useState('')
    const [errors,           setErrors] = useState([])
    const [inprogress,   setInprogress] = useState(false)

    const saveJob = async (e) => {
        e.preventDefault()

        setErrors([])
        setInprogress(true)

        const newJobData = new FormData()
        newJobData.append('title', title)
        newJobData.append('category', category)
        newJobData.append('type', type)
        newJobData.append('salary', salary)
        newJobData.append('description', description)
        newJobData.append('skills', skills)


        await
            axios
                .post('/api/jobs/new', newJobData, {
                    headers: {
                        Authorization: `Bearer ${getCookie('auth')}`
                    }
                })
                .then(({ data }) => {
                    setInprogress(false)
                    if (data.status == 1) {
                        setErrors({'success': data.result})
                        setTitle('')
                        setCategory('')
                        setType('')
                        setSalary('')
                        setDescription('')
                        setSkills('')
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
                title="إضافة وظيفة جديدة"
                description="وصف الموقع"
                keywords="الكلمات المفتاحية للموقع"
            />
            <section className={newJobStyle.newjob__section}>
                <div className="wd">
                    <div className={newJobStyle.newjob__box}>
                        <div className={newJobStyle.newjob__title}>
                            <h2>إضافة وظيفة جديدة</h2>
                        </div>
                        <div className={newJobStyle.newjob__row}>
                            <form onSubmit={saveJob}>

                                <div className={newJobStyle.newjob__group}>
                                    <span>العنوان</span>
                                    <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="عنوان الوظيفة" />
                                    {errors.title && <p>{errors.title}</p>}
                                </div>
                                
                                <div className={newJobStyle.newjob__group}>
                                    <span>التصنيف</span>
                                    <div className={newJobStyle.newjob__categories}>
                                        {
                                            categoriesx.map((cat, index) => (
                                                <label key={index} htmlFor={`category_${index}`}>
                                                    <input type="radio" id={`category_${index}`}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        value={cat.id}
                                                        checked={category == cat.id}
                                                        hidden
                                                    />
                                                    <div>
                                                        <span>{cat.name}</span>
                                                    </div>
                                                </label>
                                            ))
                                        }
                                    </div>
                                    {errors.category && <p>{errors.category}</p>}
                                </div>

                                <div className={newJobStyle.newjob__group}>
                                    <span>نوع الوظيفة</span>
                                    <div className={newJobStyle.newjob__categories}>
                                        {
                                            typesx.map((typez, index) => (
                                                <label key={index} htmlFor={`type__${index}`}>
                                                    <input
                                                        type="radio"
                                                        id={`type__${index}`}
                                                        value={typez.id}
                                                        onChange={(e) => setType(e.target.value)}
                                                        checked={type == typez.id}
                                                        hidden
                                                    />
                                                    <div>
                                                        <span>{typez.name}</span>
                                                    </div>
                                                </label>
                                            ))
                                        }
                                    </div>
                                    {errors.type && <p>{errors.type}</p>}
                                </div>
                                
                                <div className={newJobStyle.newjob__group}>
                                    <span>مجال الراتب</span>
                                    <select onChange={(e) => setSalary(e.target.value)}
                                            value={salary}
                                            id={salary ? newJobStyle.itsok : ''}>
                                            <option></option>
                                        {
                                            salariesx.map((slr, index) => (
                                                <option key={index} value={slr.id}>{slr.name}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.salary && <p>{errors.salary}</p>}
                                </div>

                                <div className={newJobStyle.newjob__group}>
                                    <span>الوصف</span>
                                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} rows="10" placeholder="وصف الوظيفة"></textarea>
                                    {errors.description && <p>{errors.description}</p>}
                                </div>

                                <div className={newJobStyle.newjob__group}>
                                    <span>المهارات المطلوبة</span>
                                    <input onChange={(e) => setSkills(e.target.value)} value={skills} type="text" placeholder="Laravel, React, Tailwind" />
                                    {errors.skills && <p>{errors.skills}</p>}
                                </div>

                                {
                                    errors.danger
                                    &&
                                        <div className={newJobStyle.errorMessage}>
                                            <p>{errors.danger}</p>
                                        </div>

                                    ||

                                    errors.success
                                    &&
                                        <div className={newJobStyle.successMessage}>
                                            <p>{errors.success}</p>
                                        </div>
                                }

                                <div className={newJobStyle.newjob__btn}>
                                    <button type="submit">نشر الوظيفة</button>
                                </div>

                                {
                                    inprogress &&
                                        <div className="loader"><div></div></div>
                                }

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

NewJob.getLayout = function getLayout(page) {
    return <Master>{page}</Master>
}

export async function getServerSideProps(context) {
    const authToken = await context.req.cookies['auth'];

    const categories = await axios.get('api/get/categories')
    const types      = await axios.get('api/get/types')
    const salaries   = await axios.get('api/get/salaries')

    return { 
        props: {
            "categoriesx": categories.data,
            "typesx": types.data,
            "salariesx": salaries.data
        } 
    }
}