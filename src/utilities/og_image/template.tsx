import type { SatoriOptions } from "satori";
import { readFile } from "node:fs/promises";
import { cats, bg } from "./images";

const getQuicksandFontPath = (version: string) =>
  `./node_modules/@fontsource/quicksand/files/quicksand-${version}.woff`;

const [quicksand400, quicksand400Ext, quicksand700, quicksand700Ext] =
  await Promise.all([
    readFile(getQuicksandFontPath("latin-400-normal")),
    readFile(getQuicksandFontPath("latin-ext-400-normal")),
    readFile(getQuicksandFontPath("latin-700-normal")),
    readFile(getQuicksandFontPath("latin-ext-700-normal")),
  ]);

export const templateOptions = async function (): Promise<SatoriOptions> {
  return {
    width: 960,
    height: 540,
    fonts: [
      /*
       * Ext versions should be named Quicksand, not Quicksand Ext
       * but satori doesn't support font-face's unicode-range fallbacks yet,
       * so I'm just treating them as separate fonts.
       */
      {
        name: "Quicksand",
        data: quicksand400,
        weight: 400,
        style: "normal",
      },
      {
        name: "Quicksand Ext",
        data: quicksand400Ext,
        weight: 400,
        style: "normal",
      },
      {
        name: "Quicksand",
        data: quicksand700,
        weight: 700,
        style: "normal",
      },
      {
        name: "Quicksand Ext",
        data: quicksand700Ext,
        weight: 700,
        style: "normal",
      },
    ],
  };
};

type TemplateProps = {
  name: string;
  description: string;
};

declare module "react" {
  namespace JSX {
    type WithTw<T> = T & {
      tw?: string;
    };

    interface IntrinsicElements {
      /*
       * I tried to shorten it
       *
       * type IntrinsicElements = {
       *   [K in "div" | "h1" | "p"]: WithTw<IntrinsicElements[K]>;
       * };
       *
       * but declaration merging doesn't work with types.
       */
      div: WithTw<
        DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
      >;
      h1: WithTw<
        DetailedHTMLProps<
          HTMLAttributes<HTMLHeadingElement>,
          HTMLHeadingElement
        >
      >;
      p: WithTw<
        DetailedHTMLProps<
          HTMLAttributes<HTMLParagraphElement>,
          HTMLParagraphElement
        >
      >;
    }
  }
}

export function Template(props: TemplateProps) {
  return (
    <div
      tw="flex flex-col items-center justify-center border-[9px] border-yellow-500 w-full h-full px-6 bg-white"
      style={{
        fontFamily: '"Quicksand", "Quicksand Ext"',
        backgroundImage: `url(data:image/png;base64,${bg})`,
        backgroundSize: "200px 200px",
        backgroundRepeat: "repeat",
      }}
    >
      <h1 tw="font-bold text-5xl">{props.name}</h1>
      <p tw="text-xl w-2/3">{props.description}</p>
      <img
        src={`data:image/png;base64,${cats[0]}`}
        width={270}
        height={300}
        style={{
          position: "absolute",
          right: "30px",
          bottom: "0",
        }}
      />
    </div>
  );
}
