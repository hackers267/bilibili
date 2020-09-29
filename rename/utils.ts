export function isMp4(fileName: string) {
    return fileName.endsWith("mp4");
}

export function isFlv(fileName: string) {
    return fileName.endsWith("flv");
}

export function isVideo(fileName: string) {
    return isMp4(fileName) || isFlv(fileName);
}

export function isInfo(fileName: string) {
    return fileName.endsWith("info");
}

export function getDir(cur: { path: string }): string {
    try {
        const lastIndex = cur.path.lastIndexOf("\\");
        return cur.path.substring(0, lastIndex);
    } catch (e) {
        return "";
    }
}
