import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyBooks from './pages/MyBooks'; // Import the MyBooks component

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-books" element={<MyBooks />} /> {/* Fix: use 'element' instead of 'component' */}
        {/* Other routes can be added here */}
      </Routes>
    </Router>
  );
};

export default App;
