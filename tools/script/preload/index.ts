import OsApi from "os";
import PathApi from "path";
import FileApi from "fs";

(window as any).base = {
    Os: OsApi,
    Path: PathApi,
    Platform: OsApi.platform(), //darwin、linux、win32
    File: FileApi
}