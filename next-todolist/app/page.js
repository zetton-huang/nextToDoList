"use client";
import Link from "next/link";

export default function Home() {
  console.log("error");
  return (
    <>
      <div className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
        <Link href={"/todolist"}>點擊開始安排</Link>
      </div>
    </>
  );
}
