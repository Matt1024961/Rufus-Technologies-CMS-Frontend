// associated interfaces
import { ReducerInterface as interface1 } from './bar-graph/interface';
import { ReducerInterface as interface2 } from './pie-graph/interface';
import { ReducerInterface as interface3 } from './line-graph/interface';
export interface ModuleInterface {
  'bar-graph': interface1;
  'pie-graph': interface2;
  'line-graph': interface3;
}
