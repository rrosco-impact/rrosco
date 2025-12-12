"use client";

import { ArrowDown, MessageCircle, FileText, ArrowUpRight } from "lucide-react";
import { Input, Textarea, Button, Form, addToast } from "@heroui/react";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineArrowDownward } from "react-icons/md";
import { useRef, useState } from "react";

import TechIcon from "./components/techIcon";
import Image from "next/image";

export default function Home() {
  const formRef = useRef(null);

  const [sending, setSending] = useState(false);
  const [invalidError, setInvalidError] = useState({
    emailInvalid: false,
    messageInvalid: false
  })

  async function handleSubmit(e) {
    setSending(true);
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (data.email === "" || data.email.trim().length === 0) {
      setInvalidError({ ...invalidError, emailInvalid: true })
      return;
    } else {
      setInvalidError({ ...invalidError, emailInvalid: false })
    }

    if (data.message === "" || data.message.trim().length == 0) {
      setInvalidError({ ...invalidError, messageInvalid: true })
      return;
    } else {
      setInvalidError({ ...invalidError, messageInvalid: false })
    }    

    const res = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    const resData = await res.json();
    console.log(!resData.error);
    
    if (!resData.error) {
      console.log("Success.");
      
      addToast({
        title: "Message successfuly sent.",
        hideIcon: true,
        color: "success"
      });

      formRef.current.reset();
    } else {
      addToast({
        title: "There was a problem sending the message.",
        description: "Please try again.",
        hideIcon: true,
        color: "warning"
      });
    }

    setSending(false);
  }

  const Tech = ({text}) => {
    return <div className="px-[20px] py-[8px] bg-white text-black rounded-full">
      {text}
    </div>
  }
  
  const DownArrow = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 -960 960 960" width="100px" fill="#e3e3e3"><path d="M433-826v511L201-547l-66 67 345 345 346-345-67-67-232 232v-511h-94Z"/></svg>
  }

  return (
    <div className="bg-[url(/noise.png)] bg-repeat h-full w-screen flex flex-col items-center justify-center relative space-y-[20px] relative">
      {/* HERO */}
      <section className="h-screen w-[900px] py-[160px] flex flex-col space-y-[20px]">
        <div className="h-full w-full bg-[url(/noise1.png)] bg-repeat p-[20px] flex flex-row space-x-[20px] rounded-bl-[20px] rounded-r-[20px]">
          <div className="h-full w-full flex flex-col space-y-[10px]">
            <div className="h-full w-full flex flex-col bg-white border-[20px] border-white p-[20px] overflow-hidden">
              <div className="h-full w-full bg-[url(/profpic.png)] bg-cover bg-position-[center_-25px] scale-130" />
            </div>
            <div className="flex flex-row space-x-[10px] text-black">
              <Button className="w-full flex flex-row justify-center items-center px-[16px] py-[4px] bg-white rounded-[8px]">
                <FaLinkedin />
                <span>let's connect</span>
              </Button>
              <Button className="w-full flex flex-row justify-center items-center px-[16px] py-[4px] bg-white rounded-[8px]">
                <MessageCircle className="size-[16px]" />
                <span>contact me</span>
              </Button>
              <Button className="w-full flex flex-row justify-center items-center px-[16px] py-[4px] bg-white rounded-[8px]">
                <FileText className="size-[16px]" />
                <span>resume / cv</span>
              </Button>
            </div>
          </div>
          <div className="h-full w-full px-[30px] flex flex-col justify-between relative">
            <span className="font-semibold text-[#1C1C1C] text-[48px]">
              Hi! I'm owen!
            </span>
            <span className="font-semibold text-[#2C50EA] text-[72px] leading-none">
              i love creating solutions.
            </span>
          </div>
        </div>
        <div className="h-full w-full flex flex-row space-x-[20px]">
          <div className="h-full w-full bg-[url(/noise2.png)] bg-repeat p-[20px] rounded-l-[20px] flex items-center">
            <span className="font-semibold text-[#9C205F] text-[72px] text-start leading-none">
              design thinking.
              <br />
              full stack dev.
            </span>
          </div>
          <div className="h-full w-full bg-[url(/noise3.png)] bg-repeat p-[20px] rounded-r-[20px] rounded-bl-[20px] flex flex-col justify-center items-center">
            <span className="font-semibold text-[#F2F2F2] text-[72px] text-center leading-none">
              check out my work.
            </span>
            <DownArrow />
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section className="h-screen w-[900px] py-[160px] flex flex-col space-y-[20px]">
        <div className="h-full w-full bg-[url(/noise-arc2.png)] bg-repeat rounded-tl-[20px] rounded-br-[20px] px-[20px] pt-[20px] flex flex-row space-x-[20px]">
          <div className="h-full w-full flex flex-col space-y-[10px]">
            <div className="h-full w-full bg-[url(/noise-arc1.png)] bg-repeat px-[20px] pt-[20px] bg-top rounded-tl-[20px]">
              <div className="h-full w-full bg-[url(/archive.png)] bg-cover rounded-tr-[20px]" />
            </div>
          </div>
        </div>
        <div className="h-full w-full flex justify-center space-x-[20px]">
          <div className="h-full w-full flex flex-col space-y-[20px] bg-[url(/noise-arc1.png)] bg-repeat rounded-r-[20px] rounded-tl-[20px] p-[20px] flex justify-center">
            <div className="space-y-[10px] flex flex-col">
              <Image
                src={"/archive-logo.png"}
                alt="Archive"
                height={50}
                width={240}
              />
            </div>
            <span className="text-white text-[24px] leading-none">
              a research and thesis repository for universities and colleges
            </span>
            {/* <div className="flex flex-wrap gap-[10px]">
              <Tech text={"React"} />
              <Tech text={"NodeJS"} />
              <Tech text={"Express"} />
              <Tech text={"MongoDB"} />
              <Tech text={"Vercel"} />
            </div> */}
            <span className="flex flex-row items-center">
              <span className="text-[16px] underline">
                projectarchive.vercel.app
              </span>
              <ArrowUpRight className="size-[20px]" />
            </span>
          </div>
          <div className="h-full w-full bg-[url(/noise-ano4.png)] bg-repeat p-[20px] flex flex-col justify-center items-center rounded-tl-[20px] rounded-br-[20px]">
            {/* <ArrowDown className="size-[100px]" /> */}
            <div className="flex flex-wrap gap-[10px]">
              <Tech text={"React"} />
              <Tech text={"NodeJS"} />
              <Tech text={"Express"} />
              <Tech text={"MongoDB"} />
              <Tech text={"Vercel"} />
            </div>
          </div>
        </div>
      </section>

      {/* ANONY */}
      <section className="h-screen w-[900px] py-[160px] flex flex-row space-x-[20px]">
        <div className="h-full w-full bg-[url(/noise-ano3.png)] bg-repeat rounded-r-[20px] px-[20px] pt-[20px] flex flex-row space-x-[20px]">
          <div className="h-full w-full flex flex-col space-y-[10px]">
            <div className="h-[66%] w-full bg-[url(/noise-border.png)] bg-repeat px-[20px] pt-[20px] bg-top rounded-l-[20px]">
              <div className="h-full w-full bg-[url(/anony.png)] bg-cover rounded-t-[20px]" />
            </div>
            <div className="h-[34%] flex items-start">
              <div className="flex flex-wrap items-center gap-[10px]">
                <Tech text={"React"} />
                <Tech text={"React Native"} />
                <Tech text={"Express"} />
                <Tech text={"Node JS"} />
                <Tech text={"PostgreSQL"} />
                <Tech text={"NeonDB"} />
                <Tech text={"OAuth 2.0"} />
                <Tech text={"Vertex AI"} />
                <Tech text={"Gemini LLM"} />
                <Tech text={"Vercel and Cron"} />
                <Tech text={"Google Cloud Storage"} />
                <Tech text={"Google Chat API"} />
                <Tech text={"Facebook Pages API"} />
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-full flex flex-col justify-between space-y-[20px]">
          <div className="h-full w-full flex flex-col space-y-[40px] bg-[url(/noise-ano4.png)] bg-repeat rounded-l-[20px] p-[20px] space-y-[20px] flex justify-center">
            <div className="space-y-[10px] flex flex-col">
              <Image
                src={"/anony-logo.png"}
                alt="Archive"
                height={37.5}
                width={180}
              />
            </div>
            <span className="text-white text-[24px] leading-none">
              an anonymous feedback submission platform utilizing gemini for
              content summarization & sentiment analysis.
            </span>
            <span className="flex flex-row items-center">
              <span className="text-[16px] underline">anonyph.vercel.app</span>
              <ArrowUpRight className="size-[20px]" />
            </span>
          </div>
          <div className="h-full w-full bg-[url(/noise-isk7.png)] bg-repeat p-[20px] flex flex-col justify-center items-center rounded-bl-[20px] rounded-r-[20px]">
            <ArrowDown className="size-[100px]" />
          </div>
        </div>
      </section>

      {/* ISKED */}
      <section className="h-screen w-[900px] py-[160px] flex flex-col space-y-[20px]">
        <div className="h-full w-full bg-[url(/noise-isk7.png)] bg-repeat rounded-tl-[20px] rounded-br-[20px] pl-[20px] pt-[20px] flex flex-row space-x-[20px]">
          <div className="h-full w-full flex flex-col space-y-[10px]">
            <div className="h-full w-full bg-[url(/isked.png)] bg-top-left bg-size-[180%]" />
          </div>
        </div>
        <div className="h-full w-full flex justify-center space-x-[20px]">
          <div className="h-full w-full flex flex-col space-y-[40px] bg-[url(/noise-isk5.png)] bg-repeat rounded-r-[20px] rounded-tl-[20px] p-[20px] flex justify-center">
            <div className="space-y-[10px] flex flex-col items-start">
              <span className="text-[72px] font-bold leading-none">isked</span>
              <span className="text-white text-[24px] text-start leading-none">
                a booking management platform for a kids playhouse and cafe.
              </span>
            </div>
            <div className="flex flex-wrap justify-start gap-[10px]">
              <Tech text={"NextJS"} />
              <Tech text={"Render"} />
              <Tech text={"Supabase DB & Auth"} />
            </div>
            <span className="flex flex-row items-center">
              <span className="text-[16px] underline">
                kopimama.onrender.com
              </span>
              <ArrowUpRight className="size-[20px]" />
            </span>
          </div>
          <div className="h-full w-full bg-[url(/noise-sv.png)] bg-repeat p-[20px] flex flex-col justify-center items-center rounded-tl-[20px] rounded-br-[20px]">
            <ArrowDown className="size-[100px]" />
          </div>
        </div>
      </section>

      {/* SERVISIT */}
      <section className="h-screen w-[900px] py-[160px] flex flex-col space-y-[20px]">
        <div className="h-[800px] w-[900px] flex justify-center space-x-[20px]">
          <div className="h-full w-full flex flex-col space-y-[40px] bg-[url(/servisit.png)] bg-right rounded-r-[20px] rounded-tl-[20px] flex justify-center" />
          <div className="h-full w-full bg-[url(/noise-sv.png)] bg-repeat p-[20px] flex flex-col justify-center items-center rounded-tl-[20px] rounded-br-[20px]">
            <ArrowDown className="size-[100px]" />
          </div>
        </div>
        <div className="h-full w-full flex justify-center space-x-[20px]">
          <div className="h-full w-full flex flex-col space-y-[40px] bg-[url(/noise-isk5.png)] bg-repeat rounded-r-[20px] rounded-tl-[20px] p-[20px] flex">
            <div className="space-y-[10px] flex flex-col items-start">
              <span className="text-[72px] font-bold leading-none">isked</span>
            </div>
            <span className="text-white text-[24px] text-start leading-none">
              a booking management platform for a kids playhouse and cafe.
            </span>
            <div className="flex flex-wrap justify-start gap-[10px]">
              <Tech text={"NextJS"} />
              <Tech text={"Render"} />
              <Tech text={"Supabase DB and Auth"} />
            </div>
            <span className="flex flex-row items-center">
              <span className="text-[16px] underline">
                kopimama.onrender.com
              </span>
              <ArrowUpRight className="size-[20px]" />
            </span>
          </div>
          <div className="h-full w-full bg-[url(/noise-sv.png)] bg-repeat p-[20px] flex flex-col justify-center items-center rounded-tl-[20px] rounded-br-[20px]">
            <span className="font-semibold text-[#F2F2F2] text-[72px] text-center">
              next.
            </span>
            <ArrowDown className="size-[100px]" />
          </div>
        </div>
      </section>
    </div>
  );
}
