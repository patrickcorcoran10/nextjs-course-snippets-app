import {db} from '@/db';
import {notFound} from 'next/navigation'
import Link from "next/link"
import { deleteSnippet } from '@/actions';

interface SnippetShowPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function SippetShowPage(props: SnippetShowPageProps) {
    // await new Promise((r) => setTimeout(r, 2000))
    const {id} = await props.params;
    const snippet = await db.snippet.findFirst({
        where: {id: parseInt(id)}
    })

    if (!snippet) {
        return notFound()
    }
    
    const deleteSnippetAction = deleteSnippet.bind(null, snippet.id)
    
    return (
    <div>
        <div className='flex m-4 justify-between items-center'>
            <h1 className="text-xl font-bold">{snippet.title}</h1>
            <div className='flex gap-4'>
                <Link className='p-2 border rounded' href={`/snippets/${snippet.id}/edit`}>edit</Link>
                <form action={deleteSnippetAction}>
                    <button className='p-2 border rounded'>delete</button>
                </form>
            </div>
        </div>
        <pre className='p-3 border rounded bg-gray-200 border-gray-200'>
            <code>{snippet.code}</code>
        </pre>
    </div>
    )
}

export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();

    return snippets.map((snippet) => {
        return {
            id: snippet.id.toString()
        }
    })
}