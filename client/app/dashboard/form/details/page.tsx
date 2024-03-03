"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import Editor from "@monaco-editor/react";

export default function Page() {
  const searchParams = useSearchParams();
  const searchFormId = searchParams.get("id");
  const pathname = usePathname();
  var Root_Url = process.env.NEXT_PUBLIC_ROOT_URL_LIVE;
  var form_Url = `${Root_Url}` +  `f/` + `${searchFormId}`

  const exampleCode =
    `<!-- modify this form HTML and place wherever you want your form -->
  <form
    action="${form_Url}"
    method="POST"
  >
    <label>
      Your email:
      <input type="email" name="email">
    </label>
    <label>
      Your message:
      <textarea name="message"></textarea>
    </label>
    <!-- your other form fields go here -->
    <button type="submit">Send</button>
  </form>`;
  return (
    <div className="rounded-lg my-3 ">
      <div className="my-3 flex">
        <h2 className="align-middle ml-3 mr-3 mt-3">Your Forms's endpoint</h2>
        <input className="input font-mono input-bordered w-1/2" defaultValue={form_Url} />
      </div>
      <Editor className="rounded-md  my-3" height="50vh" defaultLanguage="html" defaultValue={exampleCode} />
    </div>
  );
}
