import Head from "@/components/metatags"
import Master from "@/layouts/master"
import axios from "@/lib/axios"
import JobStyle from "@/styles/jobs/index.module.css"
import Link from "next/link"

export default function Jooob({ job }) {

    function createMarkup() {
        const dsc = job.description.replaceAll("\r", "<br />").replaceAll("\n", "<br />");
        return { __html: '<p>'+dsc+'</p>' }
    };

    return (
        <>
            <Head
                title={job.title}
                description={job.description.substr(0, 200).replaceAll("\r", "").replaceAll("\n", "") + '...'}
                keywords="الكلمات المفتاحية للموقع"
            />
            <section className={JobStyle.job__section}>
                <div className="wd">
                    <div className={JobStyle.job__box}>
                        
                        <div className={JobStyle.job__title}>
                            <h1>{job.title}</h1>
                        </div>

                        <div className={JobStyle.job__description}>
                            <div className={JobStyle.jobtit}>
                                <span>وصف الوظيفة</span>
                            </div>
                            <div dangerouslySetInnerHTML={createMarkup()} /> 
                        </div>

                        {
                            job.skills &&
                            <div className={JobStyle.job__skills}>
                                <div className={JobStyle.jobtit}>
                                    <span>المهارات المطلوبة</span>
                                </div>
                                {
                                    job.skills.split(',').map((skillName, index) => (
                                        <button key={index}>{skillName.trim()}</button>
                                    ))
                                }
                            </div>
                        }

                        <div className={JobStyle.job__info}>
                            <div className={JobStyle.job__info__row}>
                                
                                <div className={JobStyle.job__publisher__header}>
                                    <button className={JobStyle.applyBtn}>تقدم للوظيفة</button>
                                    <div className={JobStyle.publisher__info}>
                                        <div>
                                            {job.publisher &&
                                                <Link href={`/profile/${job.publisher.token}`}>
                                                    <h3 className={JobStyle.publisher__name}>{job.publisher.first_name+' '+job.publisher.last_name}</h3>
                                                </Link>
                                            }
                                            <p className={JobStyle.published_at}>{job.created_at.slice(0, 10)}</p>
                                        </div>
                                        <div className={JobStyle.publisher__img}>
                                            {job.publisher &&
                                                <Link href={`/profile/${job.publisher.token}`}>
                                                    <img src={process.env.NEXT_PUBLIC_FILES_URL+job.publisher.image} alt={job.publisher.first_name+' '+job.publisher.last_name} />
                                                </Link>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className={JobStyle.job__info__table}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><p>مجال الراتب</p></td>
                                                <td><b>{job.salary.name}</b></td>
                                            </tr>
                                            <tr>
                                                <td><p>نوع الوظيفة</p></td>
                                                <td><b>{job.type.name}</b></td>
                                            </tr>
                                            <tr>
                                                <td><p>تاريخ النشر</p></td>
                                                <td><b>{job.created_at.slice(0, 10)}</b></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

Jooob.getLayout = function getLayout(page) {
    return <Master>{page}</Master>
}


export async function getServerSideProps({params}) {
    const response = await axios.get(`/api/getjob/${params.jobtoken}`);

    return {
        props: {
            job: response.data
        },
    }
}