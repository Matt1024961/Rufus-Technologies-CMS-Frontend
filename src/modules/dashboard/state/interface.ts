// associated interfaces
import { ReducerInterface as interface1 } from './container/interface';
import { ReducerInterface as interface2 } from './overview/interface';
import { ReducerInterface as interface3 } from './newest/interface';
import { ReducerInterface as interface4 } from './counts/interface';

export interface ModuleInterface {
  container: interface1;
  overview: interface2;
  newest: interface3;
  counts: interface4;
}
