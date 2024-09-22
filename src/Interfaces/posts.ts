import { IChildrenData} from "./post";

export interface IPosts{
  after:string|null,
  before:null,
  children:IChildrenData[]
}

