export interface StaticGridValueFormatter {
    parse: (text: string) => any;
    format: (value: any) => string;
}