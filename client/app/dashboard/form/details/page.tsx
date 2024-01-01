"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
export default function Page() {
  const searchParams = useSearchParams();
  const searchFormId = searchParams.get("id");
  const pathname = usePathname();
  return (
    <div className=" my-5">
      <div className="mockup-code">
        <pre data-prefix="$">
          <code>Hello Vashishth!</code>
        </pre>
      </div>
    </div>
  );
}
