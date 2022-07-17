export interface StaticGridChange {
    type: 'add' | 'modify' | 'remove';
    valueBefore: any;
    valueAfter: any;
    key: string;
}