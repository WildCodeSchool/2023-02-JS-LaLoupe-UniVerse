import NavBar from "./components/NavBar";
import NavBarPc from "./components/NavBarPC";
import SearchBar from "./components/SearchBar";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <NavBar />
      <NavBarPc />
      <Header />
      <SearchBar />
    </div>
  );
}

export default App;
