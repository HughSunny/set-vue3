import { AppConfig, convertPageRequestParam, http } from '@xdc/core';

enum Api {
  entity = '/api/basic/File',
}
function getUrl(service?: string) {
  return `${Api.entity}${service ? `/${service}` : ''}`;
}

export async function getFileList(params?) {
  return http.get({
    url: getUrl('List'),
    params: { appId: AppConfig.appId, ...convertPageRequestParam(params) },
  });
}

export async function uploadFile(file, bucketName?) {
  return http.uploadFile(
    { url: getUrl('Upload') },
    { file, data: { bucketName, objectName: file.name } },
    { isReturnResponse: true },
  );
}

export async function updateFile(data) {
  return http.put({ url: getUrl(), data });
}

// export async function createFile(data) {
//   return http.post({ url: getUrl(), data })
// }

export async function deleteFile(id) {
  return http.delete({ url: getUrl(id) }, { successMessageText: 'sys.constant.deleteSuccess' });
}

export async function getFileById(id) {
  return http.get({ url: getUrl(id) });
}
