import {ensureDir} from "https://deno.land/std/fs/mod.ts";
export class Target {
    private readonly fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    private static getPartName(object: { PartName: string }) {
        return object.PartName;
    }

    private static async getDir(dir: string, fileName: string) {
        await ensureDir(dir);
        return `${dir}/${fileName}`;
    }

    private static getTitle(object: { Title: string }) {
        return object.Title;
    }

    private static async getInfo(fileName: string) {
        const text = await Deno.readTextFile(fileName);
        return JSON.parse(text);
    }

    async getTarget() {
        const info = await Target.getInfo(this.fileName);
        const partName = Target.getPartName(info);
        const title = Target.getTitle(info);
        const dir = `./${title}`;
        return await Target.getDir(dir, partName);
    }
}
