/**
 * 媒体文件扩展名 图片、视频 枚举
 */
export const enum MEDIA_EXT_TYPE {
  Ico = ".ico",
  Svg = ".svg",
  Jpg = ".jpg",
  Jpeg = ".jpeg",
  Png = ".png",
  Gif = ".gif",
  Bmp = ".bmp",
  Mp4 = ".mp4",
  Avi = ".avi",
  Wmv = ".wmv",
}

/**
 * 文件扩展名 枚举
 */
export const enum FILE_EXT_TYPE {
  Pdf = ".pdf",
  Text = ".txt",
  Doc = ".doc",
  Docx = ".docx",
  Xlsx = ".xlsx",
  Xls = ".xls",
  Ppt = ".ppt",
  Pptx = ".pptx",
}


/**
 * 文件MIME类型 字符串
 */
export const UPLOAD_ACCEPT =
  "image/x-icon,image/svg+xml,image/jpeg,image/png,image/gif,application/x-bmp,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,video/mp4,video/avi,video/x-ms-wmv";

/**
 * 非图片类型
 */
export const UPLOAD_ACCEPT_FILE =
  "application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,video/mp4,video/avi,video/x-ms-wmv";

/**
 * 图片类型
 */
export const UPLOAD_ACCEPT_IMG =
  "image/x-icon,image/svg+xml,image/jpeg,image/png,image/gif,application/x-bmp";

/**
 * 文件后缀 数组
 */
export const UPLOAD_ACCEPT_EXT = [
  MEDIA_EXT_TYPE.Avi,
  MEDIA_EXT_TYPE.Bmp,
  MEDIA_EXT_TYPE.Gif,
  MEDIA_EXT_TYPE.Ico,
  MEDIA_EXT_TYPE.Jpeg,
  MEDIA_EXT_TYPE.Jpg,
  MEDIA_EXT_TYPE.Png,
  MEDIA_EXT_TYPE.Svg,
  MEDIA_EXT_TYPE.Mp4,
  MEDIA_EXT_TYPE.Wmv,
  FILE_EXT_TYPE.Doc,
  FILE_EXT_TYPE.Docx,
  FILE_EXT_TYPE.Pdf,
  FILE_EXT_TYPE.Ppt,
  FILE_EXT_TYPE.Pptx,
  FILE_EXT_TYPE.Text,
  FILE_EXT_TYPE.Xls,
  FILE_EXT_TYPE.Xlsx,
];

export const NOT_IMG_FILE_TYPE=[
  MEDIA_EXT_TYPE.Mp4,
  MEDIA_EXT_TYPE.Wmv,
  FILE_EXT_TYPE.Doc,
  FILE_EXT_TYPE.Docx,
  FILE_EXT_TYPE.Pdf,
  FILE_EXT_TYPE.Ppt,
  FILE_EXT_TYPE.Pptx,
  FILE_EXT_TYPE.Text,
  FILE_EXT_TYPE.Xls,
  FILE_EXT_TYPE.Xlsx,
]