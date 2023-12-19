import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import HongHaFeedback from './screen/HongHaFeedback';
import ParisSurvey from './screen/ParisSurvey';

function App() {
  return (
    <GlobalStyle>
      <div className="App">
        <Routes>
          {/* <Route path='/' element={<HongHaFeedback />} /> */}
          <Route path='/hong-ha-feedback' element={<HongHaFeedback />} />
          <Route path='/paris-survey' element={<ParisSurvey />} />
          <Route path="*" element={<h1>Welcome to Survey</h1>} />
        </Routes>
      </div>
    </GlobalStyle>
  );
}

export default App;