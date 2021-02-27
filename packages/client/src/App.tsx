import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  Reference,
} from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

import Product from "./pages/Product";
import Explore from "./pages/Explore";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            keyArgs: false,
            merge(existing = [], incoming) {
              let products: Reference[] = [];
              if (existing && existing.products) {
                products = products.concat(existing.products);
              }
              if (incoming && incoming.products) {
                products = products.concat(incoming.products);
              }
              return {
                ...incoming,
                products,
              };
            },
          },
        },
      },
    },
  }),
});

const App: React.FC<{}> = () => {
  return (
    <ApolloProvider client={client}>
      <AppProvider i18n={enTranslations}>
        <Router>
          <Switch>
            <Route path="/product/:productId" component={Product} />
            <Route path="/explore" component={Explore} />
            <Route>
              <div>Home</div>
            </Route>
          </Switch>
        </Router>
      </AppProvider>
    </ApolloProvider>
  );
};

export default App;
