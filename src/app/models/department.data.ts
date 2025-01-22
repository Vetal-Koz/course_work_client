import {Subdivision} from "./subdivision.data";

export interface Department extends Subdivision{
  teachingFocus: string;
  budget: number;
}
