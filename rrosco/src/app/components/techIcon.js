import Image from "next/image";

export default function TechIcon({ icon, width, height }) {
    return <span className="h-[75px] w-[75px] flex justify-center items-center bg-white rounded-[100px]">
        <Image alt="arrow" src={`/${icon}.png`} width={width} height={height}/>
    </span>
}