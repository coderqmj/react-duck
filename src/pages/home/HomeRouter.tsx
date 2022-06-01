import React from 'react';
import { DuckRuntime } from 'saga-duck';
import { Provider } from 'react-redux';

import HomeDuck from './HomeDuck';
import Home from './index';


export function HomeRouteRender() {
  const duckRuntime = new DuckRuntime(new HomeDuck());
  const ConnectComponent = duckRuntime.connectRoot()(Home);
  return (
    <Provider store={duckRuntime.store}>
      <ConnectComponent />
    </Provider>
  );
}

export class HomeRoute extends Comment {
  render() {
    return <HomeRouteRender />;
  }
}
