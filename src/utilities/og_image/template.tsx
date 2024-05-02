import type { SatoriOptions } from "satori"
import { readFile } from "node:fs/promises"
import { cats, bg } from "./images";

export const templateOptions = async function(): Promise<SatoriOptions> {
  return {
    width: 960,
    height: 540,
    fonts: [
      {
        name: "Quicksand",
        data: await readFile("./public/quicksandNormal.ttf"),
        weight: 400,
        style: "normal"
      },
      {
        name: "Quicksand",
        data: await readFile("./public/quicksandBold.ttf"),
        weight: 800,
        style: "normal"
      }
    ],
  };
}

type TemplateProps = {
  name: string;
  description: string;
}

export function Template(props: TemplateProps) {
  return (
    //@ts-ignore
    <div tw="flex flex-col item-center justify-center border-[9px] border-yellow-500 w-full h-full px-6 bg-white"
      style={{
        fontFamily: "Quicksand",
        backgroundImage: `url(data:image/png;base64,${bg})`,
        backgroundSize: "200px 200px",
        backgroundRepeat: "repeat",
      }}>
      {/* @ts-ignore */}
      <h1 tw="font-bold text-5xl">{props.name}</h1>
      {/* @ts-ignore */}
      <p tw="text-xl w-2/3">{props.description}</p>
      <img src={`data:image/png;base64,${cats[0]}`} width={270} height={300} style={{
        position: "absolute",
        right: "30px",
        bottom: "0",
      }} />
    </div>
  )
}
