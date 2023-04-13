import SearchBar from "./components/SearchBar";
import "./App.css";
import Header from "./components/Header";
import CardArtiste from "./components/CardArtiste";

function App() {
  return (
    <div>
      <Header />
      <SearchBar />
      <div className="flex overflow-scroll">
        <CardArtiste />
      </div>
    </div>
  );
}

export default App;
