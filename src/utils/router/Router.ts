import Block from '../block/Block';
import Route from './Route';
class Router {
  static __instance: Router;
  routes: Route[] = [];
  history: History = window.history;
  _currentRoute: Route | null = null;
  _rootQuery?: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: () => Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    const allowedRoutesWithoutCookie = ['/', '/sign-up'];
    if (!localStorage.getItem('cookie')) {
      if (!allowedRoutesWithoutCookie.includes(window.location.pathname)) {
        router.go('/');
      }
    } else if (window.location.pathname === '/' || window.location.pathname === '/sign-up') {
      router.go('/messenger');
    }

    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      const notFoundRoute = this.getRoute('/*');
      if (notFoundRoute) {
        if (this._currentRoute && this._currentRoute !== notFoundRoute) {
          this._currentRoute.leave();
        }
        this._currentRoute = notFoundRoute;
        notFoundRoute.render();
      }
      return;
    }
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render();
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
const router = new Router('.app');
export default router;
