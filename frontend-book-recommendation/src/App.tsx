import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyBooks from './pages/MyBooks';
import GoogleBooksPage from './pages/GoogleBooksPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-books" element={<MyBooks />} /> 
        <Route path="/google-books" element={<GoogleBooksPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
