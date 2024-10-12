import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import HongHaFeedback from './screen/HongHaFeedback';
import ParisSurvey from './screen/ParisSurvey';
import HongHaSurvey from './screen/HongHaSurvey';
import HongHaSurvey2 from './screen/HongHaSurvey2';
import KnSurvey from './screen/KnSurvey';

function App() {
  return (
    <GlobalStyle>
      <div className="App">
        <Routes>
          {/* <Route path='/' element={<HongHaFeedback />} /> */}
          <Route path='/hong-ha-feedback' element={<HongHaFeedback />} />
          <Route path='/paris-survey' element={<ParisSurvey />} />
          <Route path='/hongha-survey' element={<HongHaSurvey />} />
          <Route path='/hongha-survey2' element={<HongHaSurvey2 />} />
          <Route path='/kangnam-survey' element={<KnSurvey />} />
          <Route path="*" element={<h1 style={{padding:'20px', color:'white', textAlign:'center'}}>Welcome to Survey</h1>} />
        </Routes>
      </div>
    </GlobalStyle>
  );
}

export default App;