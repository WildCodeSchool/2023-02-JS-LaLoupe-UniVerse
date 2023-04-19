import NavBar from "./components/NavBar";
import NavBarPc from "./components/NavBarPC";
import SearchBar from "./components/SearchBar";
import "./App.css";
import Header from "./components/Header";
import CardAlbumTitre from "./components/CardAlbumTitre";
import CardArtiste from "./components/CardArtiste";
import CardGenre from "./components/CardGenre";

function App() {
  return (
    <div>
      <NavBar />
      <NavBarPc />
      <Header />
      <SearchBar />
      <CardAlbumTitre />
      <div className="flex overflow-scroll">
        <CardArtiste />
      </div>
      <CardGenre />
    </div>
  );
}

export default App;
