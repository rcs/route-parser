export interface Route<TParams> {
    /**
     * Match a path against this route, returning the matched parameters if
     * it matches, false if not.
     * 
     * @example
     * var route = new Route('/this/is/my/route')
     * route.match('/this/is/my/route') // -> {}
     * @example
     * var route = new Route('/:one/:two')
     * route.match('/foo/bar/') // -> {one: 'foo', two: 'bar'}
     * 
     * @param path The path to match this route against
     * @return A map of the matched route parameters, or false if matching failed
     */
    match(path: string): { [key in keyof TParams]: string; } | false;

    /**
     * Reverse a route specification to a path, returning false if it can't be fulfilled
     * 
     * @example
     * var route = new Route('/:one/:two')
     * route.reverse({one: 'foo', two: 'bar'}) -> '/foo/bar'
     * 
     * @param params The parameters to fill in
     * @return The filled in path
     */
    reverse(params: { [key in keyof TParams]: string | number; }): string | false;
}

export const Route: {
    /**
     * Represents a route
     * 
     * @example
     * var route = Route('/:foo/:bar');
     * @example
     * var route = Route('/:foo/:bar');
     * 
     * @param spec The string specification of the route.
     *     use :param for single portion captures, *param for splat style captures,
     *     and () for optional route branches
     */
    new(spec: string): Route<any>;
    new<TParams>(spec: string): Route<TParams>;
};