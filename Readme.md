# Creating a simple slack clone using React and Firebase

## Running the project

- Clone the project and then start the project.

  ```
  git clone https://github.com/Ninja-nick-s/slack-clone
  cd slack-clone
  npm i
  npm start
  ```

- Go to [firebase console](console.firebase.google.com) and create your firebase project and then choose a "Web" app to create which will give you `firebaseConfig` something like this.

  ```
  const firebaseConfig = {
    apiKey: 'your-key',
    authDomain: 'your-domain',
    databaseURL: 'your-db',
    projectId: 'your-project',
    storageBucket: 'your-storage',
    messagingSenderId: 'your-messaging-id',
    appId: 'your-app-id',
  };


  firebase.initializeApp(firebaseConfig);
  ```

  Add your firebase config to `src/firebase.js`. NOTE: Dont use the current `firebaseConfig` as it wont work as I have invoked permissions for anonymous users.

## Project Structure

```
src
├── components
│   ├── App.js
│   ├── MainContainer.js
│   ├── Sidebar.js
│   ├── SignIn.js
│   ├── Slack.js
│   └── index.js
├── firebase.js
├── index.css
├── index.js
└── providers
    └── UserProvider.js
```

## Hosting the project on Firbase

- For first time users, you have to donwload the `firebase-cli`.

  ```
    npm run build
    npm i -g firebase-tools
    firebase login
    firebase init
    firebase deploy
  ```

- For second time users (who have already done the above steps).

  ```
    npm run build
    firebase deploy
  ```

You can read more about firebase cli [here](https://firebase.google.com/docs/cli).