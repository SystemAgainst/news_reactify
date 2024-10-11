import Header from './components/Header/Header.tsx';
import Main from './pages/Main/Main.tsx';
import { useTheme } from './context/ThemeContext.tsx';
import { useAppSelector } from './store';

function App() {
  const { isDark } = useTheme();
  const news = useAppSelector((state) => state.news);
  console.log(news);

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <Header />
      <div className="container">
        <Main />
      </div>
    </div>
  );
}

export default App;
