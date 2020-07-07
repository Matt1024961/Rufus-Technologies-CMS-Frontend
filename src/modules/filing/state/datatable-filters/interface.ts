export interface ReducerInterface {
  page_index: number;
  page_size: number;
  filter: string;
  filing_inline: boolean;
  parsing_accomplished: boolean;
  order: string;
  order_direction: 'asc' | 'desc';
  cik: string;
  form_type: string;
  filing_period: string;
}
