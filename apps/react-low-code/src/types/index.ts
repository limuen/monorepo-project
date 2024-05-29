export type AnyObject = Record<string | number | symbol, any>;
export type IListItem = {
  label?: string | number;
  value?: string | number;
  disabled?: boolean;
  options?: IListItem[];
  [key: string]: any;
};
