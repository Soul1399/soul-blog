import { PageDefinition } from "./page-definition";

export const HOME_PAGE: string = 'HOME';
const ANGULAR_PAGE: string = 'ANGULAR';
const CSHARP_PAGE: string = 'C-SHARP';
const SQL_PAGE: string = 'SQL-SERVER';

let _refPages = new Map<string, PageDefinition>([
    [HOME_PAGE, {
        name: 'Home',
        orderInMenu: 1,
        menuIcon: 'home',
        localize: {
            fr : { name: 'Accueil' },
            tu : { name: 'Anasayfa' }
        }
    }],
    [ANGULAR_PAGE, {
        name: 'Augular',
        orderInMenu: 2,
        menuIcon: 'javascript',
        localize: {
            fr : { name: 'Augular' },
            tu : { name: 'Augular' }
        }
    }],
    [CSHARP_PAGE, {
        name: 'CSharp',
        title: 'C#',
        orderInMenu: 3,
        localize: {
            fr : { name: 'CSharp' },
            tu : { name: 'CSharp' }
        }
    }],
    [SQL_PAGE, {
        name: 'SQLServer',
        title: 'SQL Server',
        orderInMenu: 4,
        menuIcon: 'dataset',
        localize: {
            fr : { name: 'SQLServer' },
            tu : { name: 'SQLServer' }
        }
    }]
]);

export const RefPages = _refPages;