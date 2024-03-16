import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppPageContext } from '../models/app-page-context';
import { AppPageNames } from '../models/app-page-names';
import { HOME_PAGE, RefPages } from '../models/ui/ref-pages';


@Injectable({
  providedIn: 'root'
})
export class PageService  {

  constructor() { }

  getContext(page: string): AppPageContext {
    const pageKey = page?.toUpperCase() || HOME_PAGE;
    switch (pageKey) {
      default:
        const refPage = RefPages.get(pageKey);
        if (refPage) {
          const context = Object.assign(new AppPageContext(), {
            layout: '',
            menuShowMode: 'hidden',
            isLoading: true,
            names: {
                en: Object.assign(new AppPageNames(), {
                  key: page,
                  name: refPage.name,
                  title: refPage.title || refPage.name,
                  description: refPage.description
                })
            }
          });
          for (const key in refPage.localize) {
            if (Object.prototype.hasOwnProperty.call(refPage.localize, key)) {
              const local = refPage.localize[key];
              context.names[key] = Object.assign(new AppPageNames(), {
                key: page,
                name: local.name || refPage.name,
                title: local.title || local.name || refPage.name,
                description: local.description || refPage.description
              });
            }
          }
          return context;
        }
    }
    return new AppPageContext();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.getContext(state.url.split('/').reverse()[0]);
  }
}
