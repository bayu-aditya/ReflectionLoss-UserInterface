import FileDownload from "js-file-download";

export const Downloader = (resp: any) => {
  let contentDisposition: string = resp.headers["content-disposition"]
  let contentType: string = resp.headers["content-type"]
  let filename = contentDisposition.split(";")[1].split("=")[1]

  FileDownload(resp.data, filename, contentType)
}