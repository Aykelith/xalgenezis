declare const RouteTypes: {
    readonly GET: 0;
    readonly POST: 1;
    readonly ALL: 9;
};
export default RouteTypes;
declare type RouteTypeKeys = keyof typeof RouteTypes;
export declare type RouteType = typeof RouteTypes[RouteTypeKeys];
export declare function createRouteFunction(routeType: RouteType): "get" | "post" | "all";
//# sourceMappingURL=RouteTypes.d.ts.map