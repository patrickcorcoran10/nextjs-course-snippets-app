import {db} from '@/db';
import {notFound} from 'next/navigation'
interface SnippetShowPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function SippetShowPage(props: SnippetShowPageProps) {
    await new Promise((r) => setTimeout(r, 2000))
    const {id} = await props.params;
    const snippet = await db.snippet.findFirst({
        where: {id: parseInt(id)}
    })

    if (!snippet) {
        return notFound()
    }
  

    
    return (
    <>
        <h4 className="border rounded p-2 w-full">{snippet.title}</h4>
        {/* <textarea className="border rounded p-2 w-full">{snippet.code}</textarea> */}
        </>
    )
}