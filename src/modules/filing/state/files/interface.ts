export interface ReducerInterface {
  id: string;
  html_files: ObjectItem;
  xml_files: ObjectItem;
  zip_location: string;
  filing: string;
}

export interface ArrayItem extends Array<ObjectItem> {}

export interface ObjectItem {
  primary?: boolean;
  file: string;
  title: string;
  url: string;
}
