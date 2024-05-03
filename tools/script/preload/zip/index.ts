import File from "fs";
import Path from "path";

const Zip = {
    file: (file: string, path: string, on_progress: any, on_end: any, on_error: any, )=>{
        const UnZipper = require("unzipper");
        let totalSize = 0;
        const stat= File.statSync(file);
        totalSize = stat.size;
        const zipStream = File.createReadStream(file);
        zipStream.on("data", (chunk: any)=>{
            if(typeof on_progress == "function"){
                on_progress(chunk, totalSize);
            }
        });
        zipStream.pipe(UnZipper.Parse()).on("entry", (entry: any)=>{
            if(typeof on_progress == "function"){
                const fullPath = Path.join(path, entry.path);
                const directory = Path.dirname(fullPath);

                File.mkdirSync(directory, {recursive: true});
                if (entry.type === "File") {
                    entry.pipe(File.createWriteStream(fullPath))
                }else{
                    entry.autodrain();
                }
            }
        }).on("finish", ()=>{
            zipStream.destroy();
            setTimeout(()=>{
                File.unlinkSync(file);
            }, 500);
        }).promise().then(()=>{
            if(typeof on_end == "function"){
                on_end();
            }
        }, (error: any)=>{
            if(typeof on_error == "function"){
                on_error(error);
            }
        });
    }
}

export default Zip;