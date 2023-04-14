import NavBar from "./components/NavBar";
import NavBarPc from "./components/NavBarPC";
import SearchBar from "./components/SearchBar";
import "./App.css";
import Header from "./components/Header";
import CardArtiste from "./components/CardArtiste";
import CardList from "./components/CardList";

function App() {
  return (
    <>
      <NavBar />
      <NavBarPc />
      <Header />
      <SearchBar />
      <CardList />
      <CardArtiste />
      <CardList />
      <CardList />
      <CardList />
    </>
  );
}

export default App;
