
export interface PageDefinition extends PageDefinitionBase {
    orderInMenu: number;
    localize?: { [language: string]: PageDefinitionBase }
}

export interface PageDefinitionBase {
    name: string;
    title?: string | null;
    description?: string | null;
    linkName?: string | null;
    menuIcon?: string | null;
}