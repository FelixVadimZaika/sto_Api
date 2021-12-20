import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from "./store"
import { AuthUser } from './view/Auth/Login/actions';

import "cropperjs/dist/cropper.css";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap";
import './index.css';

const token = localStorage.token as string;

if (token) {
  AuthUser(token, store.dispatch);
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
