## Survey Web / Hồng Hà Feedback

### Mục Lục

- [1. Sửa file HongHaFeedback/index.js ](#1)
- [2. Sửa file HongHaFeedback/HongHaFeedback.module.scss](#2)
- [3. Làm việc với file index.js](#3)
- [4. Làm việc với component App.js](#4)
- [5. Làm việc với component GlobalStyles](#5)

### Bắt đầu làm App

<a name="1"></a>
**1. Khởi tạo App**

- Chọn ổ cứng và thư mục để lưu trữ App, Sử dụng Terminal gõ lệnh `npx create-react-app survey-web`. Trong đó `survey-web` là tên thư mục App

<a name="2"></a>
**2. Setup Github Repo**

1. Đăng ký, Tạo Repo 
    - Đăng ký tài khoản trên https://github.com/
    - Chọn New repository
    - Đặt tên cho Project (Repository name)
    - Xác nhận (Create respository)

2. Khai báo / thư mục code lên Repo
    - Chột phải thư mục chứa code chọn Open In Integrated Terminal
    - Gõ các lệnh sau :
        git init
        git add README.md
        git commit -m "first commit"
        git branch -M main
        git remote add origin https://github.com/scicodeteam/survey-web.git
        git push -u origin main

3. Update code lên git
    git add .
    git commit -m "update"
    git push

<a name="3"></a>
**3. Làm việc với file index.js**

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
```
- Cài đặt `Router@6` để cấu hình đường dẫn đến các màn hình App `npm install react-router-dom@6`

- Impornt thư viện của router để sử dụng ` import { BrowserRouter as Router } from 'react-router-dom';`

- Components của Router phải lồng bên ngoài của components App

<a name="4"></a>
**4 Làm việc với component App.js**

```
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
```

- Trong thư mục `screens` Tạo các components Home, HongHaContact

- Import các screen tương tứng vào trong file App.js

<a name="5"></a>
**5. Làm việc với component GlobalStyle**

- Trong thư mục `components` tạo components GlobalStyle index.js và GlobalStyle.scss (components này sẽ chứa tất cả các css khai báo chung của app)

- Cài đặt sass `npm i sass`

- index.js

```
import './GlobalStyle.scss';

function GlobalStyle({children}) {
    return children;
}

export default GlobalStyle;
```

- GlobalStyle.scss

```
@import url('https://huudinh.github.io/assets/sass/lib.min.css');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@200;300&display=swap');
@import url('https://huudinh.github.io/assets/sass/icon.min.css');
@font-face {
    font-family: 'fontello';
    src: url(https://huudinh.github.io/assets/fonts/fontello.woff2) format("woff2"), url(https://huudinh.github.io/assets/fonts/fontello.woff) format("woff");
}
```
