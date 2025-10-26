interface ReactElementLike {
    $$typeof: symbol;
    key: string | null;
    props: Record<string, unknown>;
    ref: any;
    type: string | Function | symbol | {
        render?: Function;
    };
}
export declare function isValidElement(object: unknown): object is ReactElementLike;
export {};
//# sourceMappingURL=is-valid-element.d.ts.map