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
* $ git clone https://github.com/Yanlin0408/My_Kijiji_Clone.git <br/>
* $ cd mobile<br/>
* $ npm install<br/>
* $ expo start<br/>
* $ Click "Run on Android/emulator"<br/>
* $ Or download Expo go on physical device and Scan QR code<br/>
// If your firewall is on ("Something is wrong" on physical device is shown), you can run "expo start --tunnel" in step 4 instead

### Run Backend Locally:
* $ Split terminal<br/>
* $ cd backend<br/>
* $ npm install<br/>
* $ nodemon index.js<br/>

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
