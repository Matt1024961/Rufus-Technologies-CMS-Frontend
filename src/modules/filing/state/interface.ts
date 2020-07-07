// associated interfaces
import { ReducerInterface as interface1 } from './datatable/interface';
import { ReducerInterface as interface2 } from './datatable-filters/interface';
import { ReducerInterface as interface3 } from './view/interface';
import { ReducerInterface as interface4 } from './view-filters/interface';
import { ReducerInterface as interface5 } from './files/interface';
export interface ModuleInterface {
  datatable: interface1;
  datatable_filters: interface2;
  view: interface3;
  view_filters: interface4;
  files: interface5;
}
