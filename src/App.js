import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import routes from './routes';
import Navigation from './components/Navigation/Navigation';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home-page" */),
);

const MoviesPage = lazy(() =>
  import('./pages/MoviesPage' /* webpackChunkName: "movies-page" */),
);

const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Suspense
        fallback={
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
            timeout={3000}
          />
        }
      >
        <Navigation />

        <Switch>
          <Route exact path={routes.HOME} component={HomePage} />
          <Route path={routes.MOVIE_DETAILS} component={MovieDetailsPage} />
          <Route path={routes.MOVIES} component={MoviesPage} />
          <Redirect to={routes.HOME} />
        </Switch>
      </Suspense>
    </div>
  </BrowserRouter>
);
export default App;
