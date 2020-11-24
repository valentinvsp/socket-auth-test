import React from 'react'
import AuthHandler from './AuthHandler'

const PageLayout = ({children}) => {
    return (
        <div>
            <header style={{ padding: 20 , background: '#03050799' }}>
                <AuthHandler />
            </header>
            {children}
            <footer>i am the footer</footer>
        </div>
    )
}

export default PageLayout
