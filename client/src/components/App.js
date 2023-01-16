import ApiContextProvider from "./contextAPI";
import Search from "./Search";
import Header from "./Header";
import Footer from "./Footer";
import "./styles.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ApiContextProvider>
        <Header />
       
          <Search />
        
        <Footer />
      </ApiContextProvider>
    </div>
  );
}

export default App;