import { z } from "astro/zod";
import type { Result } from "./types";
import { Ok, Err } from "./types";
import { marked } from "marked";
export type Contributor = {
    name: string;
    url: String;
}

export type Config = {
    name?: string;
    description_pl?: string;
    description_en?: string;
    technologies?: string[];
    contributors?: Contributor[];
}

const configSchema = z.object({
    name: z.string().optional(),
    description_pl: z.string().optional(),
    description_en: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    contributors: z.array(z.object({
        name: z.string(),
        url: z.string().optional(),
    })).optional()
});

export class Metadata {
    logoUrl: Result<string>;
    config: Result<Config, (string | number)[]>;
    readmePl: Result<string>;
    readmeEn: Result<string>;
    constructor(repoName: string, entries: any){
            this.logoUrl = this.#setLogoUrl(repoName, entries["logo"]);
            this.config = this.#setConfig(entries["config"]);
            this.readmePl = this.#setReadmePolish(entries["readmePl"]);
            this.readmeEn = this.#setReadmeEnglish(entries["readmeEn"]);
    }
    #setLogoUrl(repoName: string, logo: any): Result<string> {
        if(!logo) {
            return Err();
        }
        logo = logo[0];
        const imageEndpoint = `${repoName}/main/.akai/${logo}`;
        const baseUrl = "https://raw.githubusercontent.com/akai-org/";
        return Ok(new URL(imageEndpoint, baseUrl).toString());
    }
    #setConfig(config: any): Result<Config, (string | number)[]> {
        if(!config) {
            return Err();
        }
        config = config[1].text;
        const parsed = JSON.parse(config);
        const result = configSchema.safeParse(parsed);
        if(result.success) {
            return Ok(parsed);
        } else {
            const failed = result.error.issues.map(issue => {
                return issue.path;
            }).flat();
            return Err(failed);
        }
    }
    #setReadmePolish(readme: any): Result<string>{
        return readme ? Ok(marked(readme[1].text) as string) : Err();  
    }
    #setReadmeEnglish(readme: any): Result<string>{
        return readme ? Ok(marked(readme[1].text) as string) : Err();  
    }
}

