import OsApi from "os";
import PathApi from "path";
import FileApi from "fs";

(window as any).base = {
    os: OsApi,
    path: PathApi,
    platform: OsApi.platform(), //darwin、linux、win32
    file: FileApi,
    lang: {
        t: false,
        locale: false
    }
}