// associated interfaces
import { ReducerInterface as interface1 } from './user-config/interface';
import { ReducerInterface as interface2 } from './authentication/interface';
import { ReducerInterface as interface3 } from './favorites/interface';


export interface ModuleInterface {
  'user-config': interface1;
  'authentication': interface2;
  'favorites': interface3;
}
