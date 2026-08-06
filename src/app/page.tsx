import {db} from '@/db';

export default async function Home() {
  const snippets = await db.snippet.findMany();
  console.log(snippets)

  const renderedSnippets = snippets.map((snippet: {id: number, title:string, code:string}) => {
    return (
      <div key={snippet.id}>
        {snippet.title}
      </div>
    )
  })
   return (
    <div>{renderedSnippets}</div>
  );
}
