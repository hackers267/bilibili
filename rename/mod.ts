import {copy, walk} from "https://deno.land/std/fs/mod.ts";
import {Target} from "./target.ts";
import {getDir, isInfo, isVideo} from "./utils.ts";
import {Video} from "./video.ts";

const [dir,type='mp4'] = Deno.args;
let fileContainer: any[] = [];
for await (const entry of walk(`./${dir}`)) {
  const { isFile, name, path } = entry;
  if (isFile) {
    fileContainer.push({ path, name });
  }
}

const structure = fileContainer.filter(({ name }) => isInfo(name) || isVideo(name)).reduce(
  (acc, cur, curIndex, array) => {
    const next = array[curIndex + 1];
    const curDir = getDir(cur);
    const nextDir = getDir(next);
    if (curDir === nextDir) {
      const nextPath = next?.path;
      const curPath = cur.path;
      const info = getInfo(curPath, nextPath);
        const video = new Video(curPath,type);
        const file = video.getPath(curPath,nextPath);
      return [...acc, { info, video: file}];
    }
    return [...acc];

    function getInfo(curPath: string, nextPath: string): string {
      return isInfo(curPath) ? curPath : nextPath;
    }
  },
  [],
);
for await (const cur of structure) {
  const target = new Target(cur.info);
  const targetPath = await target.getTarget();
  const targetFile = `${targetPath}.${type}`;
  const originalFile = cur.video;
  copy(originalFile, targetFile);
}
