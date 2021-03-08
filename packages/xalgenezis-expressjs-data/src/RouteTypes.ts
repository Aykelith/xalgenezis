const RouteTypes = {
  GET: 0,
  POST: 1,

  ALL: 9,
} as const;

export default RouteTypes;

export type RouteTypeKeys = keyof typeof RouteTypes;
export type RouteTypeValues = typeof RouteTypes[RouteTypeKeys];

export function createRouteFunction(routeType: RouteTypeValues) {
  switch (routeType) {
    case RouteTypes.GET:
      return "get";
    case RouteTypes.POST:
      return "post";
    case RouteTypes.ALL:
      return "all";
    default:
      throw new Error();
  }
}

