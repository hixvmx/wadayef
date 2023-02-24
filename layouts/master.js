import Header from "@/components/header"
import NextNProgress from 'nextjs-progressbar'

export default function Master({children}) {
    return (
        <>
            <NextNProgress color="#81d758" startPosition={0.3} stopDelayMs={200} height={2} showOnShallow={true} />
            <Header />
            {children}
        </>
    )
}