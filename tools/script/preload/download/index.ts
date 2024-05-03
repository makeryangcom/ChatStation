const Download = {
    service: (uir: string, file: any, on_response: any, on_data: any, on_end: any)=>{
        const request = require("request");
        let download: any = request({
            method: "GET",
            uri: uir,
            headers: {
                "Referer": "https://nodechain.makeryang.com",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.215 Safari/537.36"
            }
        });
        download.pipe(file);
        download.on("response", function (file_data: any) {
            if(typeof on_response == "function"){
                on_response(file_data);
            }
        });
        download.on("data", function (chunk: any) {
            if(typeof on_data == "function"){
                on_data(chunk);
            }
        });
        download.on("end", function () {
            if(typeof on_end == "function"){
                on_end();
            }
        });
    }
}

export default Download;