# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## To use https on development server you have to use mkcert and please follow steps below:

for SSL_CRT_FILE please use [name].local.pem
for SSL_CRT_FILE please use [name].local-key.pem
name - your choosen file name.

1. Windows: Uruchom notatnik jako administrator i edytuj:C:\Windows\System32\drivers\etc\hosts
2. Dodaj linie : 127.0.0.1 shop.local
3. Pobierz mkcert
4. Dodanie mkcert do PATH w zmiennych środowiskowych.
5. Uruchom polecenie mkcert-install w cmd jako admin bo znalezieniu lokalizacji pliku.
6. Uruchom polecenie mkcert name(nazwa pliku) w folderze projektu.
7. Stwórz plik .env w głównym katalogu bezpośrednio i wypełnij na podstawie podanego .env.example wypełaniając wartości dla podanych kluczy.

np.

HOST=shop.local
HTTPS=true
PORT=443
SSL_CRT_FILE=shop.local.pem
SSL_KEY_FILE=shop.local-key.pem
