"use client";

import { ArrowDown, ArrowDownToLine } from "lucide-react";
import { Input, Textarea, Button, Form, addToast } from "@heroui/react";
import { FaLinkedin } from "react-icons/fa";
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

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {/* HERO-SECTION */}
      <section className="h-screen w-full flex justify-center items-center bg-[#EBE9DD] relative">
        <div className="w-[960px] flex flex-col items-center space-y-[160px]">
          <span className="flex flex-row space-x-[12px] lg:space-x-[24px]">
            <span className="w-[140px] flex flex-col justify-center items-center space-x-[12px] text-[24px] space-y-[0px] leading-8">
              <p className="text-[#00A652]">identify</p>
              <p className="text-[#00A652]">pain point</p>
            </span>
            <Image alt="arrow" src={"/arrow.svg"} width={40} height={40} />
            <span className="w-[140px] flex flex-col justify-center items-center text-[24px] space-y-[0px] leading-8">
              <p className="text-[#0061EE]">prototype</p>
              <p className="text-[#0061EE]">solution</p>
            </span>
            <Image alt="arrow" src={"/arrow.svg"} width={40} height={40} />
            <span className="w-[140px] flex flex-col justify-center items-center text-[24px] space-y-[0px] leading-8">
              <p className="text-[#FF77B9]">get</p>
              <p className="text-[#FF77B9]">feedback</p>
            </span>
            <Image alt="arrow" src={"/arrow.svg"} width={40} height={40} />
            <span className="w-[140px] flex flex-col justify-center items-center text-[24px] space-y-[0px] leading-8">
              <p className="text-[#FF7300]">iterate</p>
            </span>
          </span>
          <div className="w-full flex flex-col items-center text-[48px] text-[#141213] font-bold leading-14">
            <h1>Hi! I'm Owen.</h1>
            <h1>Let’s solve your problems!</h1>
          </div>
          <span className="flex flex-row items-center text-[24px] space-x-[10px] space-y-[0px]">
            <a
              href="#archive"
              className="h-[52px] flex flex-row px-[24px] py-[8px] border-[4px] box-border rounded-full items-center text-[24px] text-[#00A652] space-x-[10px]"
            >
              <p>View my work</p>
              <ArrowDown />
            </a>
            <a
              href="#contact"
              className="h-[52px] flex flex-row px-[24px] py-[8px] rounded-full items-center text-[24px] bg-[#FF7300] text-white font-semibold space-x-[10px]"
            >
              <p>Let's work together!</p>
              <ArrowDownToLine strokeWidth={3} />
            </a>
          </span>
        </div>
        <a
          href="https://www.linkedin.com/in/rrosco/"
          className="h-[48px] w-[48px] flex justify-center items-center bg-white border-[4px] border-[#0061EE] rounded-[100px] absolute bottom-20"
        >
          <FaLinkedin className="h-[24px] w-[24px] text-[#0061EE]" />
        </a>
      </section>

      {/* ARCHIVE-SECTION */}
      <section
        id="archive"
        className="h-[300px] w-full flex flex-col justify-center items-center space-y-[24px] bg-[#E39F0C]"
      >
        <a target="_blank" rel="noopener noreferrer" href="https://projectarchive.vercel.app" className="text-[48px] font-medium underline">
          projectarchive.vercel.app
        </a>
        <span className="flex flex-row flex-wrap ">
          <TechIcon icon={"mongodb"} width={50} height={50} />
          <TechIcon icon={"react"} width={50} height={50} />
          <TechIcon icon={"vite"} width={50} height={50} />
          <TechIcon icon={"express"} width={50} height={50} />
          <TechIcon icon={"node"} width={50} height={50} />
          <TechIcon icon={"vercel"} width={50} height={50} />
        </span>
      </section>
      <section className="h-[calc(100vh-400px)] lg:h-[calc(100vh-300px)] w-full flex justify-center p-[100px] bg-center bg-[url(/archive-bg.png)] bg-cover relative">
        <div className="h-[90px] w-full flex flex-col justify-center items-center space-y-[24px]">
          <Image
            alt="archive-logo"
            src={"/archive-logo.png"}
            width={445}
            height={90}
          />
          <span className="px-[24px] py-[12px] bg-[#92979F] md:text-[16px] md:text-[16px] lg:text-[24px] text-[#1D1E21] font-bold rounded-full">
            a research and thesis repository for universities
          </span>
        </div>
        <Image
          alt="archive-prototype"
          src={"/archive-pt.png"}
          width={1080}
          height={684}
          className="lg:h-5/8 w-auto absolute bottom-0"
        />
        <a
          href="#anony"
          className="bg-white h-[100px] w-[100px] flex justify-center items-center absolute bottom-20 right-20 cursor-pointer rounded-full"
        >
          <ArrowDown className="text-black h-[50px] w-[50px]" />
        </a>
      </section>

      {/* ANONY-SECTION */}
      <section id="anony" className="h-[300px] w-full flex flex-col justify-center items-center space-y-[24px] bg-[#1A91E5]">
        <a target="_blank" rel="noopener noreferrer" href="https://anonyph.vercel.app" className="text-[48px] font-medium underline">anonyph.vercel.app</a>
        <span className="flex flex-row justify-center flex-wrap">
          <TechIcon icon={"postgresql"} width={50} height={50} />
          <TechIcon icon={"neondb"} width={50} height={50} />
          <TechIcon icon={"react"} width={50} height={50} />
          <TechIcon icon={"vite"} width={50} height={50} />
          <TechIcon icon={"express"} width={50} height={50} />
          <TechIcon icon={"node"} width={50} height={50} />
          <TechIcon icon={"vercel"} width={50} height={50} />
          <TechIcon icon={"gcloud"} width={50} height={50} />
          <TechIcon icon={"gemini"} width={50} height={50} />
        </span>
      </section>
      <section className="h-[calc(100vh-400px)] lg:h-[calc(100vh-300px)] w-full flex justify-center p-[100px] bg-center bg-[url(/anony-bg.png)] bg-cover relative">
        <div className="h-[90px] w-full flex flex-col justify-center items-center space-y-[24px]">
          <Image
            alt="anony-logo"
            src={"/anony-logo.png"}
            width={240}
            height={90}
          />
          <span className="px-[24px] py-[12px] bg-[#1A91E5] md:text-[16px] lg:text-[24px] text-[#FFFFFF] font-bold rounded-full">
            an anonymous feedback platform using sentiment analysis
          </span>
        </div>
        <Image
          alt="anony-prototype"
          src={"/anony-pt.png"}
          width={1080}
          height={684}
          className="lg:h-5/8 w-auto absolute bottom-0"
        />
        <a
          href="#kopimama"
          className="bg-white h-[100px] w-[100px] flex justify-center items-center absolute bottom-20 right-20 cursor-pointer rounded-full"
        >
          <ArrowDown className="text-black h-[50px] w-[50px]" />
        </a>
      </section>

      {/* KOPIMAMA-SECTION */}
      <section
        id="kopimama"
        className="h-[300px] w-full flex flex-col justify-center items-center space-y-[24px] bg-[#F08686]"
      >
        <a target="_blank" rel="noopener noreferrer" href="https://kopimama.onrender.com" className="text-[48px] font-medium underline">
          kopimama.onrender.com
        </a>
        <span className="flex flex-row ">
          <TechIcon icon={"postgresql"} width={50} height={50} />
          <TechIcon icon={"supabase"} width={50} height={50} />
          <TechIcon icon={"nextjs"} width={50} height={50} />
          <TechIcon icon={"paymongo"} width={35} height={35} />
          <TechIcon icon={"render"} width={50} height={50} />
        </span>
      </section>
      <section className="h-[calc(100vh-400px)] lg:h-[calc(100vh-300px)] w-full flex justify-center p-[72px] bg-center bg-[url(/kopimama-bg.png)] bg-cover relative">
        <div className="h-[90px] w-full flex flex-col justify-center items-center space-y-[24px]">
          <Image
            alt="kopimama-logo"
            src={"/kopimama-logo.png"}
            width={90}
            height={90}
          />
          <span className="px-[24px] py-[12px] bg-[#F08686] md:text-[16px] lg:text-[24px] text-[#FFFFFF] font-bold rounded-full">
            a booking platform for a kids play place and cafe
          </span>
        </div>
        <Image
          alt="kopimamma-prototype"
          src={"/kopimama-pt.png"}
          width={1080}
          height={684}
          className="lg:h-5/8 w-auto absolute bottom-0"
        />
        <a
          href="#servisit"
          className="bg-white h-[100px] w-[100px] flex justify-center items-center absolute bottom-20 right-20 cursor-pointer rounded-full"
        >
          <ArrowDown className="text-black h-[50px] w-[50px]" />
        </a>
      </section>

      {/* SERVISIT-SECTION */}
      <section
        id="servisit"
        className="h-[300px] w-full flex flex-col justify-center items-center space-y-[24px] bg-[#ED5758]"
      >
        <a target="_blank" rel="noopener noreferrer" href="https://facebook.com/servisitph" className="text-[48px] font-medium underline">
          facebook.com/servisitph
        </a>
      </section>
      <section className="h-[calc(100vh-400px)] lg:h-[calc(100vh-300px)] w-full flex justify-center pt-[200px] bg-top bg-[url(/servisit-bg.png)] bg-cover relative">
        <div className="h-[90px] w-full flex flex-col justify-center items-center space-y-[24px]">
          <span className="px-[24px] py-[12px] bg-[#ED5758] md:text-[16px] lg:text-[24px] text-[#FFFFFF] font-bold rounded-full">
            a cleaning service startup that provided moms with part-time jobs
          </span>
        </div>
        <a
          href="#contact"
          className="bg-white h-[100px] w-[100px] flex justify-center items-center absolute bottom-20 right-20 cursor-pointer rounded-full"
        >
          <ArrowDown className="text-black h-[50px] w-[50px]" />
        </a>
      </section>

      {/* TECHNOLOGIES-SECTION */}
      <section
        id="technologies"
        className="h-[300px] w-full flex flex-col justify-center items-center space-y-[24px] bg-[#EBE9DD]"
      >
        <a className="text-[48px] font-medium text-[#141213]">
          Other technologies
        </a>
        <span className="flex flex-row ">
          <TechIcon icon={"github"} width={50} height={50} />
          <TechIcon icon={"docker"} width={50} height={50} />
          <TechIcon icon={"figma"} width={25} height={25} />
          <TechIcon icon={"lucid"} width={50} height={50} />
          <TechIcon icon={"heroui"} width={50} height={50} />
        </span>
      </section>

      {/* CONTACT-SECTION */}
      <section
        id="contact"
        className="h-screen w-full flex justify-center items-center p-[72px] bg-[#FDF6EE]"
      >
        <div className="w-[720px] flex flex-col items-center p-[48px] bg-[#EBE9DD] rounded-[24px]">
          <p className="text-[48px] text-[#141213] flex-1 font-bold">
            Let's collaborate!
          </p>
          <p className="text-[24px] text-[#141213] mb-[12px] flex-1">
            Tell us what about your pain point.
          </p>
          <Form
            ref={formRef}
            className="w-full flex flex-col flex-2 space-y-[12px]"
            onSubmit={handleSubmit}
          >
            <span className="w-full flex flex-row space-x-[12px]">
              <Input
                name="email"
                isRequired
                type="email"
                errorMessage={({ validationDetails, validationErrors }) => {
                  if (validationDetails.typeMismatch) {
                    return "Please enter a valid email address.";
                  }

                  if (invalidError.emailInvalid) {
                    return "Please enter your email address.";
                  }
                  return validationErrors;
                }}
                variant="bordered"
                label="Email address"
                classNames={{
                  inputWrapper:
                    "bg-white border-[#141213] border-[4px] data-[hover=true]:border-[#00A652]",
                  input: "text-[#141213]",
                }}
              />
              <Input
                name="phoneNumber"
                variant="bordered"
                label="Phone number"
                classNames={{
                  inputWrapper:
                    "bg-white border-[#141213] border-[4px] data-[hover=true]:border-[#00A652]",
                  input: "text-[#141213]",
                }}
              />
            </span>
            <Textarea
              name="message"
              isRequired
              errorMessage={({ validationDetails, validationErrors }) => {
                if (invalidError.messageInvalid) {
                  return "Please enter your message.";
                }
                return validationErrors;
              }}
              className="w-full"
              label="Enter your message"
              classNames={{
                inputWrapper:
                  "bg-white border-[#141213] border-[4px] data-[hover=true]:border-[#00A652] data-[hover=true]:bg-white",
                input: "text-[#141213]",
              }}
            />
            <Button isLoading={sending} className="bg-[#FF7300] text-white font-bold w-full" type="submit">Send</Button>
          </Form>
        </div>
      </section>
    </div>
  );
}
