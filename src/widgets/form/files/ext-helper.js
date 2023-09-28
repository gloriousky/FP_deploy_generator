import path from "path";
import {
  Document,
  VideoCamera,
  Headset,
  Picture,
} from "@element-plus/icons-vue";

const mapping = {
  ".aac": "audio/aac",
  ".avi": "video/x-msvideo",
  ".bmp": "image/bmp",
  ".css": "text/css",
  ".csv": "text/csv",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".eot": "application/vnd.ms-fontobject",
  ".gif": "image/gif",
  ".html": "text/html",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript",
  ".json": "application/json",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".mpeg": "video/mpeg",
  ".mpkg": "application/vnd.apple.installer+xml",
  ".oga": "audio/ogg",
  ".ogv": "video/ogg",
  ".ogx": "application/ogg",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".svg": "image/svg+xml",
  ".swf": "application/x-shockwave-flash",
  ".tar": "application/x-tar",
  ".tif": "image/tiff",
  ".ttf": "font/ttf",
  ".txt": "text/plain",
  ".wav": "audio/wav",
  ".weba": "audio/webm",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".zip": "application/zip",
  ".heic": "image/heic",
};

export const getFileMime = (filename) => {
  const ext = path.extname(filename);
  return mapping[ext];
};

export const getFileName = (filepath) => {
  return path.basename(filepath);
};

export const getUrlPathName = (fileUrl) => {
  try {
    return new URL(fileUrl).pathname;
  } catch (e) {
    return "unknown";
  }
};

export const sizeComputed = (number, unitIdx = 0) => {
  const units = ["B", "KB", "MB", "GB"];
  if (number < 1000) {
    return `${number} ${units[unitIdx]}`;
  }

  return sizeComputed(parseInt(number / 1000), ++unitIdx);
};

export const iconComputed = (type) => {
  switch (type) {
    case "video/x-msvideo":
    case "video/mpeg":
    case "video/ogg":
    case "video/webm":
    case "video/mp4":
      return VideoCamera;

    case "audio/aac":
    case "audio/mpeg":
    case "audio/ogg":
    case "audio/wav":
    case "audio/webm":
      return Headset;

    case "image/bmp":
    case "image/gif":
    case "image/jpeg":
    case "image/png":
    case "image/svg+xml":
    case "image/tiff":
    case "image/webp":
    case "image/heic":
      return Picture;

    default:
      return Document;
  }
};
