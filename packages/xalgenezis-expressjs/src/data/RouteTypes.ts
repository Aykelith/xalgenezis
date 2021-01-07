const RouteTypes = {
    GET: 0,
    POST: 1,

    ALL: 9
} as const;

export default RouteTypes;

type RouteTypeKeys = keyof typeof RouteTypes;
export type RouteType = typeof RouteTypes[RouteTypeKeys];

export function createRouteFunction(routeType : RouteType) {
    switch (routeType) {
        case RouteTypes.GET: return "get";
        case RouteTypes.POST: return "post";
        case RouteTypes.ALL: return "all";
        default: throw new Error();
    }
}