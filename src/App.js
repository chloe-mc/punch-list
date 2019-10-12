import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Mappage from './components/Mappage';

function App() {
	return (
		<Router>
			<Route
				path="/"
				render={({ location }) => {
					return <Mappage
						discipline={location.pathname.substring(1)}
						query={location.search}
					/>
				}}
			/>
		</Router>
	);
}

export default App;
