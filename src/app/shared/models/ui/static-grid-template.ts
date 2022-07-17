import { TemplateRef } from "@angular/core";

export interface StaticGridTemplate {
    type: 'header' | 'footer' | null;
    outlet: TemplateRef<any> | null;
    outletContext: Object | null;
}
