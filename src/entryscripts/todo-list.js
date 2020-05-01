import React from 'react'
import ReactDOM from 'react-dom'
import '../assets/font/style.css'

const App = () => {
	return (
		<div style={{
			fontFamily: 'Gilroy Medium'
		}}>Electron Todo App !!!!!!!</div>
	)
}

ReactDOM.render(<App />, document.getElementById('react-root'));