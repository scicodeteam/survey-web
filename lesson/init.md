## Survey Web

### Mục Lục

- [1. Khởi tạo App](#1)
- [2. Create Repo](#2)
- [2. Làm việc với file index.js](#2)
- [3. Làm việc với component App.js](#3)
- [4. Làm việc với component GlobalStyles](#4)
- [5. Làm việc với component Home](#5)
- [6. Làm việc với component DefaultLayout](#6)

### Bắt đầu làm App

<a name="1"></a>
**1. Khởi tạo App**

- Chọn ổ cứng và thư mục để lưu trữ App, Sử dụng Terminal gõ lệnh `npx create-react-app survey-web`. Trong đó `survey-web` là tên thư mục App

<a name="2"></a>
**2. Create Repo**

1. Đăng ký, Tạo Repo 
    - Đăng ký tài khoản trên https://github.com/
    - Chọn New repository
    - Đặt tên cho Project (Repository name)
    - Xác nhận (Create respository)

2. Khai báo / thư mục code lên Repo
    - Chột phải thư mục chứa code chọn Open In Integrated Terminal
    - Gõ các lệnh sau :
        git init
        git add .
        git commit -m "first commit"
        git branch -M main
        git remote add origin https://github.com/SCI-Code-Team/survey-web.git
        git push -u origin main 

<!-- Setup Github Repo
        

        3. Tạo git page
            - Vào repo chứa project chọn setting
            - Chọn Pages bên menu trái
            - Source chọn Branch: main / click save
            - Your site is ready to be published at https://huudinh.github.io/addbook/
            - Chờ 5 phút để hệ thống update 
    -->