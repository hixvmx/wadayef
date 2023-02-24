import Head from "@/components/metatags"
import Master from "@/layouts/master"
import Link from "next/link"
import axios from "@/lib/axios"

import welcomeStyle from "@/styles/home/welcome.module.css"
import categoryStyle from "@/styles/home/category.module.css"



export default function Home({ categoriesx }) {

    return (
        <>
            <Head 
                title="وظايف"
                description="وصف الموقع"
                keywords="الكلمات المفتاحية للموقع"
            />

            <section className={welcomeStyle.welcome__section}>
                <div className={`${welcomeStyle.welcome} wd`}>
                    <h1>موقع التوظيف رقم واحد في الوطن العربي</h1>
                    <p>
                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النصوص <br/>
                        في أدوات منصة حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى <br/>
                        إضافة إلى زيادة عدد الحروف التى تولدها الأداة.
                    </p>
                    
                    {/*
                    <Link href="/register">
                        <button type="button">ابدأ الآن مجاناً</button>
                    </Link>
                    */}
                    
                </div>
            </section>

            <section className="wd">
                {
                    categoriesx.map((category, index) => (
                        <div key={index} className={categoryStyle.job__category}>
                            <div className={categoryStyle.category__title}>
                                <h2>{category.name}</h2>
                                <Link href={`/category/${category.token}`}>
                                    <button className={categoryStyle.more__jobs__btn}>المزيد</button>
                                </Link>
                            </div>
                            <div className={categoryStyle.c__jobs}>
                                
                                {
                                    category.jobs &&

                                    category.jobs.map((job, index) => (
                                        <div key={index} className={categoryStyle.c__job}>
                                            <div className={categoryStyle.c__job__row}>
                                                <div className={categoryStyle.c__job__aside}>
                                                    <div className={categoryStyle.c__job__publisherimg}>
                                                        {job.publisher &&
                                                        <Link href={`/profile/${job.publisher.token}`}>
                                                            <img src={process.env.NEXT_PUBLIC_FILES_URL+job.publisher.image} alt="" />
                                                        </Link>
                                                        }
                                                    </div>
                                                </div>
                                                <div className={categoryStyle.c__job__article}>
                                                    <Link href={`/jobs/${job.token}`}>
                                                        <div className={categoryStyle.c__job__title}>
                                                            <h3>{job.title}</h3>
                                                        </div>
                                                        <div className={categoryStyle.c__job__description}>
                                                            <p>{job.description.substr(0, 200)}...</p>
                                                        </div>
                                                    </Link>
                                                    <div className={categoryStyle.c__job__publishedat}>
                                                        <span>{job.created_at.slice(0, 10)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                
                            </div>
                        </div>
                    ))
                }
                
            </section>
        </>
    )
}

Home.getLayout = function getLayout(page) {
    return <Master>{page}</Master>
}

export async function getServerSideProps() {

    const categories = await axios.get('api/get/homecategories')

    return { 
        props: {
            "categoriesx": categories.data,
        } 
    }
}