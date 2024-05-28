export enum StorageNameMap {
  component = "componentTemplate",
  form = "formTemplate",
  modal = "modalTemplate",
  table = "tableTemplate"
}

export type StorageName = StorageNameMap.component | StorageNameMap.form | StorageNameMap.modal | StorageNameMap.table;

export const TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
