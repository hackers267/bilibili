import {isFlv, isMp4} from "./utils.ts";

export class Video {
    type: string;
    path: string;

    constructor(path: string,type:string) {
        this.path = path;
        this.type = type;
    }

    getPath(curPath: string, nextPath: string) {
        console.log(this.type);
        switch (this.type) {
            case 'mp4':
                return Video.getMp4(curPath, nextPath);
            case 'flv':
                return Video.getFlv(curPath, nextPath);
        }
        return ''
    }

    private static getMp4(curPath: string, nextPath: string) {
        return isMp4(curPath) ? curPath : nextPath;
    }

    private static getFlv(curPath: string, nextPath: string) {
        return isFlv(curPath) ? curPath : nextPath;
    }
}
