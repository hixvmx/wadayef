import Head from "@/components/metatags"
import Master from "@/layouts/master"
import axios from "@/lib/axios"
import CategoryStyle from "@/styles/category/index.module.css"
import Link from "next/link"
import { useRouter } from "next/router"


export default function Category({category}) {

    const route = useRouter()

    return (
        <>
            <Head
                title={category.name}
                description="desc"
                keywords="keywords"
            />

            {!category && route.push('/')}

            <section className="">
                <div className="wd">
                    <div className={CategoryStyle.category__title}>
                        <h2>{category.name}</h2>
                    </div>
                    <div className={CategoryStyle.c__jobs}>
                    {
                        category.jobs &&

                        category.jobs.map((job, index) => (
                            <div key={index} className={CategoryStyle.c__job}>
                                <div className={CategoryStyle.c__job__row}>
                                    <div className={CategoryStyle.c__job__aside}>
                                        <div className={CategoryStyle.c__job__publisherimg}>
                                            {job.publisher &&
                                            <Link href={`/profile/${job.publisher.token}`}>
                                                <img src={process.env.NEXT_PUBLIC_FILES_URL+job.publisher.image} />
                                            </Link>
                                            }
                                        </div>
                                    </div>
                                    <div className={CategoryStyle.c__job__article}>
                                        <Link href={`/jobs/${job.token}`}>
                                            <div className={CategoryStyle.c__job__title}>
                                                <h3>{job.title}</h3>
                                            </div>
                                            <div className={CategoryStyle.c__job__description}>
                                                <p>{job.description.substr(0,200)+'...'}</p>
                                            </div>
                                        </Link>
                                        <div className={CategoryStyle.c__job__publishedat}>
                                            <span>{job.created_at.slice(0, 10)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </section>
        </>
    )
}

Category.getLayout = function getLayout(page) {
    return (<Master>{page}</Master>)
}

export async function getServerSideProps(context) {
    
    const response = await axios.get(`/api/category/${context.params.token}`)

    return {
        props: {
            category: response.data
        }
    }
}