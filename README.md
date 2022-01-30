# chat-hub

## Description: Chat-hub is a chat app, supported by local storage, online database and redis cache

## Technology

1. Frontend: React Native, Socket.io-client, Firebase
2. Backend: Node.js, Express, Socket.io, Redis
3. Database: AsyncStorage, Redis, Firebase
4. Authetication: Firebase Authentication
5. Dev tools: Github, Android Studio, Expo
6. UI library: React Native Elements, React Navigation

## Installation

### Run Frontend Locally:
* $ git clone https://github.com/UAACC/404-project.git frontend<br/>
* $ cd frontend<br/>
* $ git fetch origin<br/>
* $ git checkout frontend<br/>
* $ cd client<br/>
* $ npm install<br/>
* $ npm run start<br/>
* $ Open frontend URL: http://127.0.0.1:3000/ <br/>

### Run Backend Locally:
* $ git clone https://github.com/UAACC/404-project.git backend<br/>
* $ cd backend<br/>
* $ git fetch<br/>
* $ git checkout backend<br/>
// optional: use your VM<br/>
* $ pip install -r requirements.txt
* $ python manage.py makemigrations<br/>
* $ python manage.py migrate<br/>
* $ python manage.py migrate --run-syncdb<br/>
* $ python manage.py runserver<br/>
* $ Open backend URL: http:/127.0.0.1:8000/admin/ <br/>

## Update

# 2022.01.29 V 1.2

1. AsyncStorage
2. chat based on socket.io
3. popup

# 2022.01.08 V 1.1

1. chat based on firebase subscription
2. refined date system

# 2021.12.26 V 1.0

1. basic chat and add-chat page
2. firebase login/logout system
3. navigation system
4. consistent theme
5. basic backend
