import { React } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Home.jsx";
import Movie from "./Components/Movie.jsx";
import { Provider } from "react-redux";
import { store } from "./App/store.js";
import ViewMore from "./features/mainSlice/ViewMore.jsx";
import { Series } from "./Components/Series.jsx";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "https://movie-app-five-opal.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});
createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    {" "}
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />}></Route>
            <Route path="/:Series" element={<Series />}></Route>
            <Route path="/movies/:id" element={<Movie />}></Route>
            <Route
              path="/Series/:id"
              element={<Movie series={true} />}
            ></Route>
            <Route path="/view/:genre" element={<ViewMore />}></Route>
            <Route
              path="/viewSeries/:genre"
              element={<ViewMore series={true} />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);
