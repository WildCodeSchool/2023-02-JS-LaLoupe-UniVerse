import NavBar from "./components/NavBar";
import NavBarPc from "./components/NavBarPC";
import SearchBar from "./components/SearchBar";
import "./App.css";
import Header from "./components/Header";
import CardList from "./components/CardList";
import CardListArtiste from "./components/CardListArtiste";

function App() {
  return (
    <>
      <NavBar />
      <NavBarPc />
      <Header />
      <SearchBar />
      <CardList />
      <CardList />
      <CardList />
      <CardList />
      <CardListArtiste />
    </>
  );
}

export default App;
