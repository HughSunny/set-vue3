import { deleteFile, getFileById, getFileList, updateFile, uploadFile } from '@/api/services/file';

export const useEntityDataOperation = () => {
  const getEntityById = async id => {
    return getFileById(id);
  };

  const getEntityList = async params => {
    return getFileList(params);
  };

  const delEntity = async id => {
    return deleteFile(id);
  };
  const createEntity = async params => {
    // return createFile(params)
  };
  const updateEntity = async (id, params) => {
    return updateFile(params);
  };

  const refreshEntityCache = dataList => {};

  return {
    getEntityList,
    getEntityById,
    createEntity,
    delEntity,
    updateEntity,
    refreshEntityCache,
  };
};
