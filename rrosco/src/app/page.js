"use client";

import { ArrowDown, MessageCircle, FileText, ArrowUpRight } from "lucide-react";
import { Input, Textarea, Button, Form, addToast, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineArrowDownward } from "react-icons/md";
import { useRef, useState } from "react";

import TechIcon from "./components/techIcon";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const formRef = useRef(null);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [sending, setSending] = useState(false);
  const [invalidError, setInvalidError] = useState({
    emailInvalid: false,
    messageInvalid: false,
  });

  async function handleSubmit(e, onClose) {
    setSending(true);
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (data.email === "" || data.email.trim().length === 0) {
      setInvalidError({ ...invalidError, emailInvalid: true });
      return;
    } else {
      setInvalidError({ ...invalidError, emailInvalid: false });
    }

    if (data.message === "" || data.message.trim().length == 0) {
      setInvalidError({ ...invalidError, messageInvalid: true });
      return;
    } else {
      setInvalidError({ ...invalidError, messageInvalid: false });
    }

    const res = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (!resData.error) {
      console.log("Success.");

      addToast({
        title: "Message successfuly sent.",
        hideIcon: true,
        color: "success",
      });

      formRef.current.reset();
    } else {
      addToast({
        title: "There was a problem sending the message.",
        description: "Please try again.",
        hideIcon: true,
        color: "warning",
      });
    }

    setSending(false);
    onClose();
  }

  const Tech = ({ text }) => {
    return (
      <div className="px-[20px] py-[8px] bg-white text-black rounded-full">
        {text}
      </div>
    );
  };

  const DownArrow = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="100px"
        viewBox="0 -960 960 960"
        width="100px"
        fill="#e3e3e3"
      >
        <path d="M433-826v511L201-547l-66 67 345 345 346-345-67-67-232 232v-511h-94Z" />
      </svg>
    );
  };

  return (
    <div className="bg-[url(/noise.png)] bg-repeat h-screen w-screen flex flex-col relative space-y-[20px]">
      <section className="h-screen w-screen px-[20%] py-[160px] flex flex-col items-center space-y-[20px] overflow-y-auto overflow-hidden">
        {/* HERO */}
        <div className="min-h-[450px] max-h-[450px] min-w-[1020px] max-w-[1020px] bg-[url(/noise1.png)] bg-repeat p-[20px] flex flex-row space-x-[20px] rounded-bl-[20px] rounded-r-[20px]">
          <div className="h-full w-full flex flex-col space-y-[10px]">
            <div className="h-full w-full flex flex-col bg-white border-[20px] border-white p-[20px] overflow-hidden">
              <div className="h-full w-full bg-[url(/profpic.png)] bg-cover bg-position-[center_-25px] scale-130" />
            </div>
            <div className="flex flex-row space-x-[10px] text-black">
              <Button className="w-full flex flex-row justify-center items-center space-x-[8px] px-[16px] py-[4px] bg-white rounded-[8px]">
                <a
                  className="w-full flex flex-row justify-center items-center space-x-[8px]"
                  href={"https://www.linkedin.com/in/rrosco/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={16} />
                  <span>Linkedin</span>
                </a>
              </Button>
              <Button className="w-full flex flex-row justify-center items-center space-x-[8px] px-[16px] py-[4px] bg-white rounded-[8px]">
                <a
                  className="w-full flex flex-row justify-center items-center space-x-[8px]"
                  href={
                    "https://drive.google.com/file/d/1Ul432tPActNl3s8uT1UVaQLBVKYTlfZ8/view?usp=sharing"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="size-[16px]" />
                  <span>CV</span>
                </a>
              </Button>
              <Button
                className="w-full flex flex-row justify-center items-center px-[16px] py-[4px] bg-white rounded-[8px]"
                onPress={() => onOpenChange(true)}
              >
                <MessageCircle className="size-[16px]" />
                <span>Contact</span>
              </Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader>Send me a message!</ModalHeader>
                      <ModalBody>
                        <Form
                          ref={formRef}
                          className="w-full flex flex-col flex-2 space-y-[10px]"
                          onSubmit={(e) => {handleSubmit(e, onClose)}}
                        >
                          <span className="w-full flex flex-row space-x-[10px]">
                            <Input
                              name="email"
                              isRequired
                              type="email"
                              errorMessage={({
                                validationDetails,
                                validationErrors,
                              }) => {
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
                            errorMessage={({
                              validationDetails,
                              validationErrors,
                            }) => {
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
                          <div className="w-full flex flex-row space-x-[10px] pb-[10px]">
                            <Button
                            className="bg-red-500 text-white w-full"
                            onPress={onClose}
                          >
                            Cancel
                          </Button>
                          <Button
                            isLoading={sending}
                            className="bg-green-600 text-white font-bold w-full"
                            type="submit"
                          >
                            Send
                          </Button>
                          </div>
                        </Form>
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
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
        <div className="min-h-[450px] max-h-[450px] min-w-[1020px] max-w-[1020px] flex flex-row space-x-[20px]">
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

        {/* ARCHIVE */}
        {/* ARCHIVE PREVIEW */}
        <div className="min-h-[450px] max-h-[450px] min-w-[1020px] max-w-[1020px] bg-[url(/noise-arc2.png)] bg-repeat rounded-tl-[20px] rounded-br-[20px] px-[20px] pt-[20px] flex flex-row space-x-[20px]">
          <div className="h-full w-full flex flex-col space-y-[10px]">
            <div className="h-full w-full bg-[url(/noise-arc1.png)] bg-repeat px-[20px] pt-[20px] bg-top rounded-tl-[20px]">
              <div className="h-full w-full bg-[url(/archive.png)] bg-cover rounded-tr-[20px]" />
            </div>
          </div>
        </div>
        <>
          {/* ARCHIVE LOGO */}
          <div className="min-h-[450px] max-h-[450px] min-w-[1020px] max-w-[1020px] flex justify-center space-x-[20px]">
            <div className="min-h-[450px] max-h-[450px] w-full flex flex-col space-y-[20px] bg-[url(/noise-arc1.png)] bg-repeat rounded-r-[20px] rounded-tl-[20px] p-[20px] flex justify-center">
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
              <a
                className="text-white"
                href={"https://projectarchive.vercel.app"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex flex-row items-center">
                  <span className="text-[16px] underline">
                    projectarchive.vercel.app
                  </span>
                  <ArrowUpRight className="size-[20px]" />
                </span>
              </a>
            </div>

            {/* ARCHIVE TECH */}
            <div className="h-full w-full bg-[url(/noise-arc1.png)] bg-repeat p-[20px] flex flex-col justify-center items-start space-y-[10px] rounded-tl-[20px] rounded-br-[20px] text-white">
              <div className="flex-row text-white">
                <span className="text-[24px] font-bold">Role: </span>
                <span className="text-[24px]">Backend Developer</span>
              </div>
              <span className="text-[24px] font-bold text-white">Technologies:</span>
              <div className="flex flex-wrap gap-[10px]">
                <Tech text={"React"} />
                <Tech text={"NodeJS"} />
                <Tech text={"Express"} />
                <Tech text={"MongoDB"} />
                <Tech text={"Vercel"} />
              </div>
            </div>
          </div>
        </>

        {/* ANONY */}
        <div className="min-h-[920px] max-h-[920px] min-w-[1020px] max-w-[1020px] flex flex-row space-x-[20px]">
          {/* ANONY PREVIEW */}
          <div className="h-full min-w-[500px] max-w-[500px] bg-[url(/noise-anobg.png)] bg-repeat rounded-r-[20px] px-[20px] pt-[20px] flex flex-row space-x-[20px]">
            <div className="h-full w-full bg-[url(/noise-border.png)] bg-repeat px-[20px] pt-[20px] rounded-tl-[20px] overflow-hidden">
              <div className="h-full w-full bg-[url(/anony1.png)] bg-contain relative">
                <div className="h-full w-full bg-black opacity-[15%] absolute top-0" />
                <Image
                  src={"/anony2.png"}
                  alt="Anony"
                  width={409}
                  height={742.82}
                  className="w-full rounded-[20px] border-gray absolute top-[400px]"
                />
              </div>
            </div>
          </div>
          {/* ANONY LOGO */}
          <div className="h-full w-full flex flex-col justify-between space-y-[20px]">
            <div className="h-full w-full flex flex-col space-y-[20px] bg-[url(/noise-anobg.png)] bg-repeat rounded-l-[20px] p-[20px] space-y-[20px] flex justify-center">
              <div className="space-y-[10px] flex flex-col">
                <Image
                  src={"/anony-logo.png"}
                  alt="Anony"
                  height={37.5}
                  width={180}
                />
              </div>
              <span className="text-white text-[24px] leading-none">
                an anonymous feedback submission platform utilizing gemini for
                content summarization & sentiment analysis.
              </span>
              <a
                className="text-white"
                href={"https://anonyph.vercel.app"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex flex-row items-center">
                  <span className="text-[16px] underline">
                    anonyph.vercel.app
                  </span>
                  <ArrowUpRight className="size-[20px]" />
                </span>
              </a>
            </div>
            {/* ANON TECH STACK */}
            <div className="h-full w-full bg-[url(/noise-anobg.png)] bg-repeat p-[20px] flex flex-col justify-center items-start space-y-[10px] rounded-bl-[20px] rounded-r-[20px]">
              <div className="flex-row text-white">
                <span className="text-[24px] font-bold">Role: </span>
                <span className="text-[24px] leading-0">
                  Full-stack Developer, Project Manager, Integration Specialist
                </span>
              </div>
              <span className="text-[24px] font-bold text-white">Technologies: </span>
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
                <Tech text={"Vercel"} />
                <Tech text={"Vercel Cron"} />
                <Tech text={"Google Cloud Storage"} />
                <Tech text={"Google Chat API"} />
                <Tech text={"Facebook Pages API"} />
              </div>
            </div>
          </div>
        </div>

        {/* ISKED */}
        {/* ISKED PREVIEW */}
        <div className="min-h-[450px] max-h-[450px] min-w-[1020px] max-w-[1020px] bg-[url(/noise-isk5.png)] bg-repeat rounded-tl-[20px] rounded-br-[20px] pl-[20px] pt-[20px] flex flex-row space-x-[20px]">
          <div className="h-full w-full flex flex-col space-y-[10px]">
            <div className="h-full w-full bg-[url(/isked.png)] bg-top-left bg-size-[180%]" />
          </div>
        </div>
        <div className="min-h-[450px] max-h-[450px] min-w-[1020px] max-w-[1020px] flex justify-center space-x-[20px]">
          {/* ISKED LOGO */}
          <div className="h-full w-full flex flex-col space-y-[20px] bg-[url(/noise-isk5.png)] bg-repeat rounded-r-[20px] rounded-tl-[20px] p-[20px] flex justify-center">
            <span className="text-[48px] font-bold leading-none text-white">isked</span>
            <div className="space-y-[10px] flex flex-col items-start">
              <span className="text-white text-[24px] text-start leading-none">
                a booking management platform for a kids playhouse and cafe.
              </span>
            </div>
            <a
              className="text-white"
              href={"https://kopimama.onrender.com"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex flex-row items-center">
                <span className="text-[16px] underline">
                  kopimama.onrender.com
                </span>
                <ArrowUpRight className="size-[20px]" />
              </span>
            </a>
          </div>

          {/* ISKED TECH */}
          <div className="h-full w-full bg-[url(/noise-isk5.png)] bg-repeat p-[20px] flex flex-col justify-center items-start space-y-[10px] rounded-tl-[20px]">
            <div className="flex-row text-white">
              <span className="text-[24px] font-bold">Role: </span>
              <span className="text-[24px] leading-0">
                Full-stack Developer
              </span>
            </div>
            <span className="text-[24px] font-bold text-white">Technologies: </span>
            <div className="flex flex-wrap items-center gap-[10px]">
              <Tech text={"NextJS"} />
              <Tech text={"PayMongo"} />
              <Tech text={"Render"} />
              <Tech text={"Supabase DB"} />
              <Tech text={"Supabase Auth"} />
            </div>
          </div>
        </div>

        {/* VIBEBAYAN */}
        <div className="min-h-[920px] max-h-[920px] min-w-[1020px] max-w-[1020px] flex flex-row space-x-[20px]">
          <div className="h-full min-w-[500px] max-w-[500px] bg-[url(/noise-vb-bg2.png)] bg-repeat rounded-bl-[20px] px-[20px] pt-[20px] flex flex-row space-x-[20px]">
            <div className="h-full w-full bg-[url(/noise-border.png)] bg-repeat px-[20px] pt-[20px] rounded-tl-[20px] overflow-hidden">
              <Image
                src={"/vibebayan.png"}
                alt="Vibebayan"
                width={409}
                height={742.82}
                className="w-full rounded-[20px] border-gray"
              />
            </div>
          </div>
          <div className="h-full w-full flex flex-col justify-between space-y-[20px]">
            <div className="h-full w-full flex flex-col space-y-[20px] bg-[url(/noise-vib8.png)] bg-repeat rounded-r-[20px] p-[20px] space-y-[20px] flex justify-center">
              <div className="space-y-[10px] flex flex-col">
                <Image
                  src={"/vibebayan-logo.svg"}
                  alt="Vibebayan"
                  height={37.5}
                  width={180}
                />
              </div>
              <span className="text-black text-[24px] leading-none">
                a crowdsourced social platform that maps the sentiments and
                issues experienced of the Filipino people.
              </span>
              <a
                href={"https://vibebayan.vercel.app"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex flex-row items-center">
                  <span className="text-black text-[16px] underline">
                    vibebayan.vercel.app
                  </span>
                  <ArrowUpRight className="size-[20px]" />
                </span>
              </a>
            </div>
            <div className="h-full w-full bg-[url(/noise-vb-bg1.png)] bg-repeat p-[20px] flex flex-col justify-center items-start space-y-[10px] rounded-t-[20px]">
              <div className="flex-row text-white">
                <span className="text-[24px] font-bold">Role: </span>
                <span className="text-[24px] leading-0">
                  Integrations Specialist
                </span>
              </div>
              <span className="text-[24px] font-bold text-white">Technologies: </span>
              <div className="flex flex-wrap items-center gap-[10px]">
                <Tech text={"NextJS"} />
                <Tech text={"Typescript"} />
                <Tech text={"Mapbox"} />
                <Tech text={"Supabase DB"} />
                <Tech text={"Supabase Auth"} />
                <Tech text={"Vercel"} />
              </div>
            </div>
          </div>
        </div>

        {/* SERVISIT */}
        <div className="min-h-[450px] max-h-[450px] min-w-[1020px] max-w-[1020px] flex justify-center space-x-[20px]">
          <div className="h-full w-full flex flex-col space-y-[40px] bg-[url(/servisit-prev.png)] bg-cover bg-bottom rounded-r-[20px] p-[20px] flex justify-center" />
        </div>
        <div className="min-h-[450px] max-h-[450px] min-w-[1020px] max-w-[1020px] flex justify-center space-x-[20px]">
          <div className="h-full w-full flex flex-col space-y-[20px] bg-[url(/noise-sv.png)] bg-repeat rounded-bl-[20px] p-[20px] space-y-[20px] flex justify-center">
            <div className="space-y-[10px] flex flex-col">
              <Image
                src={"/servisit-logo.png"}
                alt="Servisit"
                height={37.5}
                width={180}
              />
            </div>
            <span className="text-white text-[24px] leading-none">
              a cleaning service startup that provides part-time jobs to mothers
              with little-to-no education
            </span>
            <a
              className="text-white"
              href={"https://facebook.com/servisitph"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex flex-row items-center">
                <span className="text-[16px] underline">
                  facebook.com/servisitph
                </span>
                <ArrowUpRight className="size-[20px]" />
              </span>
            </a>
          </div>
          <div className="h-full w-full bg-[url(/noise-sv.png)] bg-repeat p-[20px] flex flex-col justify-center items-center rounded-tl-[20px] text-white">
            <div className="flex flex-wrap items-center gap-[10px]">
              <div className="flex-row">
                <span className="text-[24px] font-bold">Role: </span>
                <span className="text-[24px] leading-0">
                  Project Lead and Co-founder
                </span>
              </div>
              <span className="text-[24px] font-bold">Contributions: </span>
              <span className="text-[24px] leading-[24px]">
                - Led a team of three wherein in 11 months, provided more than
                ₱135,000.00 in addt’l. income to mothers with little education
                and training while earning a revenue of ₱120,000.00.
                <br />
                <br />- Headed product dev., operations, and sales leveraging
                design thinking to unify all these aspects of the business
                creating a business model that caters to both our clients and
                cleaning partners.
              </span>
            </div>
          </div>
        </div>

        {/* EVACUAID */}
        <div className="min-h-[920px] max-h-[920px] min-w-[1020px] max-w-[1020px] flex flex-row space-x-[20px]">
          {/* EVACUAID PREVIW */}
          <div className="h-full min-w-[500px] max-w-[500px] bg-[url(/noise-ev10.png)] bg-repeat rounded-r-[20px] px-[20px] pt-[20px] flex flex-row space-x-[20px]">
            <div className="h-full w-full bg-[url(/noise-border.png)] bg-repeat px-[20px] pt-[20px] rounded-Tl-[20px] overflow-hidden">
              <Image
                src={"/evacuaid.png"}
                alt="Anony"
                width={409}
                height={742.82}
                className="w-full rounded-[20px] border-gray"
              />
            </div>
          </div>
          <div className="h-full w-full flex flex-col justify-between space-y-[20px]">
            <div className="h-full w-full flex flex-col space-y-[20px] bg-[url(/noise-ev11.png)] bg-repeat rounded-l-[20px] p-[20px] space-y-[20px] flex justify-center">
              <div className="space-y-[10px] flex flex-col">
                <Image
                  src={"/evacuaid-logo.png"}
                  alt="Evacuaid"
                  height={37.5}
                  width={180}
                />
              </div>
              <span className="text-black text-[24px] leading-none">
                an evacuee management platform to aid local social welfare dev.
                officers in distributing quick relief.
              </span>
            </div>
            <div className="h-full w-full bg-[url(/noise-evac-bg1.png)] bg-repeat p-[20px] flex flex-col justify-center items-left space-y-[10px] rounded-bl-[20px] rounded-tr-[20px]">
              <div className="flex-row text-white">
                <span className="text-[24px] font-bold">Role: </span>
                <span className="text-[24px] leading-0">App Developer</span>
              </div>
              <span className="text-[24px] font-bold text-white">Technologies: </span>
              <div className="flex flex-wrap items-left gap-[10px]">
                <Tech text={"Flutter"} />
                <Tech text={"Firebase"} />
                <Tech text={"Firestore"} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
