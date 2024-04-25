import * as FileAPI from "fs";
import PathAPI from "path";

const Index = FileAPI.readFileSync("release/dist/renderer/index.html", {encoding: "utf8"});
const NewIndex = Index.replace(/.\/monacoeditorwork/g, '"monacoeditorwork');
FileAPI.writeFileSync("release/dist/renderer/index.html", NewIndex);
const icons = FileAPI.readdirSync("scripts/icons", {withFileTypes: true});
FileAPI.mkdirSync("release/dist/icons", { recursive: true });
for (let item of icons) {
    let srcPath = PathAPI.join("scripts/icons", item.name);
    let destPath = PathAPI.join("release/dist/icons", item.name);
    FileAPI.copyFileSync(srcPath, destPath);
}
const tools = FileAPI.readdirSync("tools", {withFileTypes: true});
FileAPI.mkdirSync("release/dist/tools", { recursive: true });
for (let item of tools) {
    let srcPath = PathAPI.join("tools", item.name);
    let destPath = PathAPI.join("release/dist/tools", item.name);
    FileAPI.copyFileSync(srcPath, destPath);
}