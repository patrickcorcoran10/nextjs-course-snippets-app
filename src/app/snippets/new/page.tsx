

import {db} from '@/db'
import {redirect} from 'next/navigation';

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    // This needs to be a server action
    'use server';
    // Check if input is valid
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    // take input and create a record in the db

    const snippet = await db.snippet.create({
      data: {
        title,
        code
      }
    })
    

    // after submit, take user to home page/root
    redirect('/')
  }
  return (
  <form className="" action={createSnippet}> 
    <h3 className="font-bold m-3">Create a Snippet</h3>
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <label className="w-12" htmlFor="title">Title</label>
        <input name="title" className="border rounded p-2 w-full" id="name"></input>
      </div>
      <div className="flex gap-4">
        <label className="w-12" htmlFor="code">Code</label>
        <textarea name="code" className="border rounded p-2 w-full" id="code"></textarea>
      </div>
      <button type="submit" className="rounded p-2 bg-blue-200">Create</button>
    </div>
  </form>
  )
}