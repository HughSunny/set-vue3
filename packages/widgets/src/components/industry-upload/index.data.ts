export const IMG_TYPES = [
  { type: 'image/jpeg', name: 'JPEG,JPG', suffix: '.jpg' },
  { type: 'image/png', name: 'PNG', suffix: '.png' },
  { type: 'image/gif', name: 'GIF', suffix: '.gif' },
  { type: 'image/svg+xml', name: 'SVG' },
];

export const FILE_TYPES = [
  ...IMG_TYPES,
  { type: 'application/pdf', name: 'PDF', suffix: '.pdf' },
  { type: 'application/msword', name: 'DOC', suffix: '.doc' },
  // { type: 'application/msexcel', name: 'XLSX' },
  { type: 'application/vnd.ms-excel', name: 'XLS', suffix: '.xls' },
  {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    name: 'DOCX',
    suffix: 'docx',
  },
  {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    name: 'XLSX',
    suffix: '.xlsx',
  },
  { type: 'application/zip', name: 'ZIP', suffix: '.zip' },
  { type: 'application/x-rar', name: 'RAR', suffix: '.rar' },
];

export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export const getFileName = url => {
  if (url && url.startsWith('#')) {
    return '...';
  }
  const extIndex = url.lastIndexOf('.');
  const fileExt = url.substring(extIndex + 1);
  const file1 = url.substring(url.lastIndexOf('/') + 1, extIndex);
  const file2 = file1.substring(file1.indexOf('_') + 1);
  return `${file2}.${fileExt}`;
};
