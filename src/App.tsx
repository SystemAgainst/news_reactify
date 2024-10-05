import Search from './components/Header/Header.tsx';
import Main from './pages/Main/Main.tsx';

function App() {
  return (
    <>
      <Search />
      <div className="container">
        <Main />
      </div>
    </>
  );
}

export default App;
