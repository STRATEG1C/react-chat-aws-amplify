# Как поднять проект локально

1. Склонировать этот репозиторий
2. Установить зависимости
#### `npm install`
3. Запустить проект в дев режиме
#### `npm start`

# Инструкция как сделать чат приложение на AWS c использованием Amplify

Для создания чатов на [AWS](https://aws.amazon.com/ru/) в этом примере использоваться сервис [AWS Amplify](https://aws.amazon.com/ru/amplify/), и библиотека для frontend [aws-amplify](https://docs.amplify.aws/start/q/integration/react), что позволяет в короткие сроки построить backend для мобильных и веб приложений.

Авторизация и регистрация пользователей происходит через сервис [Amazon Cognito](https://aws.amazon.com/ru/cognito/) который включает регистрацию, авторизацию пользователей по стандартной процедуре и через социальные сети и отправку писем подтверждения.

<b style='color:red'>ВАЖНО!</b> В этом случае необходимо сразу закладывать что пользователи приложения будут регистрироваться и авторизоваться именно с помощью сервиса AWS Cognito. В противном случае API нужно будет делать полностью открытым и управлять доступом внутри приложения.

Запросы к backend реализованы с помощью [GraphQL API](https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js), предоставляемый Amplify, и, который является удобным решением для frontend разработки.

Для хранения записей используется [DynamoDB](https://aws.amazon.com/ru/dynamodb/), который является JSON базой данных, и автоматически создается при использовании GraphQL API.

Схема архитектуры приложения показана на рисунке

![alt text](https://github.com/[username]/[reponame]/blob/[branch]/image.jpg?raw=true)

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

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
