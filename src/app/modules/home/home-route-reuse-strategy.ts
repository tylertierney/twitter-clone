import {
  ActivatedRouteSnapshot,
  BaseRouteReuseStrategy,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

export class HomeRouteReuseStrategy implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // return route.routeConfig!.path === 'home';
    // return true;

    // if (route.routeConfig) {
    //   return route.routeConfig.path === 'home';
    // }
    // return false;
    // if (route.routeConfig?.path === '') return true;
    // return false;
    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (route.routeConfig && route.routeConfig.path) {
      this.storedRoutes.set(route.routeConfig.path, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    if (route.routeConfig && route.routeConfig.path) {
      return (
        !!route.routeConfig && !!this.storedRoutes.get(route.routeConfig.path)
      );
    }
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    // return this.storedRoutes.get(
    //   route.routeConfig!.path!
    // ) as DetachedRouteHandle;

    if (route.routeConfig && route.routeConfig.path) {
      return this.storedRoutes.get(route.routeConfig.path) || false;
    }
    return false;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
