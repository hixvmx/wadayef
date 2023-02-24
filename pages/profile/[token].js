import Head from "@/components/metatags"
import Master from "@/layouts/master"
import profileStyle from "@/styles/profile/userprofile.module.css"
import Link from "next/link"
import axios from "@/lib/axios"


export default function userProfile(props) {

    return (
        <>
            <Head
                title={props.userInfo.first_name + ' ' + props.userInfo.last_name}
                description={props.userInfo.bio}
                keywords="user keywords"
            />

            <section className={profileStyle.section__profile}>
                <div className="wd">
                    <div className={profileStyle.profile__box}>

                        <div className={profileStyle.user__image}>
                            <img src={process.env.NEXT_PUBLIC_FILES_URL+props.userInfo.image} alt={props.userInfo.first_name + ' ' + props.userInfo.last_name} />
                        </div>
                        <div className={profileStyle.user__name}>
                            <h2>{props.userInfo.first_name + ' ' + props.userInfo.last_name}</h2>
                        </div>
                        <div className={profileStyle.user__links}>
                            {props.userInfo.twitter && (
                                <Link href={props.userInfo.twitter} target="_blank">
                                    <button>
                                        <svg viewBox="-271 296.6 256.4 208.4"><path d="M-14.6,321.2c-9.4,4.2-19.6,7-30.2,8.3c10.9-6.5,19.2-16.8,23.1-29.1c-10.2,6-21.4,10.4-33.4,12.8c-9.6-10.2-23.3-16.6-38.4-16.6c-29,0-52.6,23.6-52.6,52.6c0,4.1,0.4,8.1,1.4,12c-43.7-2.2-82.5-23.1-108.4-55c-4.5,7.8-7.1,16.8-7.1,26.5c0,18.2,9.3,34.3,23.4,43.8c-8.6-0.3-16.7-2.7-23.8-6.6v0.6c0,25.5,18.1,46.8,42.2,51.6c-4.4,1.2-9.1,1.9-13.9,1.9c-3.4,0-6.7-0.3-9.9-0.9c6.7,20.9,26.1,36.1,49.1,36.5c-18,14.1-40.7,22.5-65.3,22.5c-4.2,0-8.4-0.2-12.6-0.7c23.3,14.9,50.9,23.6,80.6,23.6c96.8,0,149.7-80.2,149.7-149.7c0-2.3,0-4.6-0.1-6.8C-30.5,341-21.6,331.8-14.6,321.2"/></svg>
                                    </button>
                                </Link>
                            )}
                            {props.userInfo.facebook && (
                                <Link href={props.userInfo.facebook} target="_blank">
                                    <button>
                                        <svg viewBox="0 0 24 24"><path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path></svg>
                                    </button>
                                </Link>
                            )}
                            {props.userInfo.instagram && (
                                <Link href={props.userInfo.instagram} target="_blank">
                                    <button>
                                        <svg viewBox="0 0 24 24"><path d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path></svg>
                                    </button>
                                </Link>
                            )}
                        </div>
                        <div className={profileStyle.user__description}>
                            {props.userInfo.bio && (
                                <p>{props.userInfo.bio}</p>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

userProfile.getLayout = function getLayout(page) {
    return (<Master>{page}</Master>)
}

export async function getServerSideProps(context) {
    
    const response = await axios.get(`/api/profile/${context.params.token}`)

    return {
        props: {
            userInfo: response.data
        }
    }
}