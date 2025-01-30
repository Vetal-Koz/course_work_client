import {Subdivision} from "./subdivision.data";

export interface Faculty extends Subdivision {
  curricula: string,
  facultyLocation: string
}
