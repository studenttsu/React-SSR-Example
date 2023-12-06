import React, { useEffect } from 'react';
import './App.css';
import logo from './logo.svg';

import PageMeta from "./components/PageMeta";
import { useStore } from "./store/StoreProvider";
import { observer } from "mobx-react-lite";

function App() {
    const { data } = useStore();

    useEffect(() => {
        console.log('App is alive');
    }, []);

  return (
    <>
      <PageMeta title="My SSR App" description="My SSR App" />

        <div hidden>
            {data.map(x => x.title)}
        </div>

      <div className="App">
        <header className="App-header">
            <img src={logo} hidden alt=""/>
          <img src="./images/logo.svg" className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </header>
      </div>
    </>
  );
}

export default observer(App);
