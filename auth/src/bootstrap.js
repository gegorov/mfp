import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './App'

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath],
  });
  if (onNavigate) {
    history.listen(onNavigate)
  }

  ReactDOM.render(<App history={history} />, el)

  /* returning an object with onParentNavigate function in order to be able to call
  *  inside container to sync browsers
  */
  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = histoey.location;
      console.log('container just navigated');
      console.log('Auth: nextpathName: ', nextPathname)

      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');

  if (devRoot) {
    // providing defaultHistory with BrowserHistory instead of MemoryHistory for better local devXP
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
