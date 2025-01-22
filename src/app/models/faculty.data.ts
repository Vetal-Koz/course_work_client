import {Subdivision} from "./subdivision.data";

export interface Faculty extends Subdivision {
  curricula?: string | null,
  facultyLocation: string
}
