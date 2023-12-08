import { Routes, Route } from 'react-router-dom';
import HongHaFeedback from './screen/HongHaFeedback';
import GlobalStyle from './components/GlobalStyle';

function App() {
  return (
    <GlobalStyle>
      <div className="App">
        <Routes>
          <Route path='/hong-ha-feedback' element={<HongHaFeedback />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>
    </GlobalStyle>
  );
}

export default App;