import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import './index.css'

const client = new ApolloClient({
  // 백엔드는 postgraphile을 사용합니다.
  uri: 'http://43.202.154.86:5001/graphql',
  // uri: 'http://127.0.0.1:5000/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
   

);

