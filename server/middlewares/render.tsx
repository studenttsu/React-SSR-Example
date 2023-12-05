import React from "react";
import { Request, Response } from "express";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { Helmet, HelmetData } from "react-helmet";

import App from "../../src/App";
import AppStore from "../../src/store/AppStore";
import { StoreProvider } from "../../src/store/StoreProvider";

const getHTML = (content: string, helmet: HelmetData, store: AppStore) => {
    const html = renderToStaticMarkup(
        <>
            <html lang="en">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    {helmet.title.toComponent()}
                    {helmet.meta.toComponent()}
                    <link href='/index.css' rel="stylesheet" />
                    <script dangerouslySetInnerHTML={{
                        __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(store)}`
                    }} />
                </head>
                <body>
                    <div id="root" dangerouslySetInnerHTML={{__html: content}} />
                    <script src="/bundle.js" />
                </body>
            </html>
        </>
    );

    return `<!DOCTYPE html>${html}`;
};

export default async (_req: Request, res: Response) => {
    const appStore = new AppStore();
    await appStore.fetchData();

    const appContent = renderToString(
        <React.StrictMode>
            <StoreProvider value={appStore}>
                <App />
            </StoreProvider>
        </React.StrictMode>
    );

    const helmetData = Helmet.renderStatic();
    const html = getHTML(appContent, helmetData, appStore);

    res.send(html);
}