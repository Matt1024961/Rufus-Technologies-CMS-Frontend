import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
  title: string;
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomRouter implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    let title;
    while (route.firstChild) {
      route = route.firstChild;
      title = route.data.title;
    }
    title = title || 'UNKNOWN';
    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { title, url, params, queryParams };
  }
}
