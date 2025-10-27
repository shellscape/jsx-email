export function isValidElement(object) {
    return (typeof object === 'object' &&
        object !== null &&
        typeof object.$$typeof === 'symbol');
}
//# sourceMappingURL=is-valid-element.js.map