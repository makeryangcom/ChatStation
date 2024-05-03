import * as SystemInformation from "systeminformation";

const System = {
    getGPU: (on_then: any, on_error: any)=>{
        SystemInformation.graphics().then((graphics: any) => {
            if(typeof on_then == "function"){
                let on_then_data: any = false;
                if(graphics.controllers.length > 0){
                    let last_size: any = 0;
                    graphics.controllers.forEach((item: any)=>{
                        let total: any = 0;
                        if(item.bus === "PCI" && item.memoryTotal){
                            total = item.memoryTotal;
                        }
                        if(item.bus === "PCI" && !item.memoryTotal && item.vram){
                            total = item.vram;
                        }
                        if(total > 0){
                            if(last_size == 0){
                                on_then_data = item;
                            }else{
                                if((total / 1024) > last_size){
                                    on_then_data = item;
                                }
                            }
                        }
                    });
                }
                on_then(on_then_data);
            }
        }).catch((error: any) => {
            if(typeof on_error == "function"){
                on_error(error);
            }
        });
    },
    getMEM: (on_then: any, on_error: any)=>{
        SystemInformation.mem().then((data: any) => {
            if(typeof on_then == "function"){
                on_then(data);
            }
        }).catch((error: any) => {
            if(typeof on_error == "function"){
                on_error(error);
            }
        });
    },
    getPathSize: (path: string, on_then: any, on_error: any)=>{
        SystemInformation.fsSize().then((data: any) => {
            data.forEach((disk: any) => {
                if (path.startsWith(disk.mount)) {
                    if(typeof on_then == "function"){
                        on_then(disk.size / (1024 ** 3), disk.used / (1024 ** 3));
                    }
                }
            });
        }).catch((error: any) => {
            if(typeof on_error == "function"){
                on_error(error);
            }
        });
    }
}

export default System;