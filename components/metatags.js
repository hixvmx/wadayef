import Head from "next/head"

export default function metatags({title, description, keywords})  {
    return (
        <Head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content={description ? description : ''} />
            <meta name="keywords" content={keywords ? keywords : ''} />
            <title>{title ? title : ''}</title>
            <link rel="icon" href="/icon.png" />
        </Head>
    )
}