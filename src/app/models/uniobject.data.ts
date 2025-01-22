export interface Uniobject {
  id: number;
  name: string;
  major?: number | null;
  classEntityName: string;
  visited?: boolean;
  items: Uniobject[];
  isDirectory: boolean;
  expanded: boolean;
}
