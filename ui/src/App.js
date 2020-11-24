import React from 'react';
import SessionHistory from './SessionHistory';
import PageLayout from './PageLayout'
import { Provider } from 'react-redux'
import store from './redux/store'
import './App.css';

function App() {

    return (
        <Provider store={store}>
            <PageLayout>
                <SessionHistory />
            </PageLayout>
        </Provider>
    );
}

export default App;
