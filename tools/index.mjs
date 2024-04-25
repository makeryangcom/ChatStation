import * as FileAPI from "fs";
import PathAPI from "path";

const Index = FileAPI.readFileSync("release/dist/template/index.html", {encoding: "utf8"});
const NewIndex = Index.replace(/.\/monacoeditorwork/g, '"monacoeditorwork');
FileAPI.writeFileSync("release/dist/template/index.html", NewIndex);
const icons = FileAPI.readdirSync("tools/icons", {withFileTypes: true});
FileAPI.mkdirSync("release/dist/icons", { recursive: true });
for (let item of icons) {
    let srcPath = PathAPI.join("tools/icons", item.name);
    let destPath = PathAPI.join("release/dist/icons", item.name);
    FileAPI.copyFileSync(srcPath, destPath);
}
const tools = FileAPI.readdirSync("tools/module", {withFileTypes: true});
FileAPI.mkdirSync("release/dist/module", { recursive: true });
for (let item of tools) {
    let srcPath = PathAPI.join("tools/module", item.name);
    let destPath = PathAPI.join("release/dist/module", item.name);
    FileAPI.copyFileSync(srcPath, destPath);
}