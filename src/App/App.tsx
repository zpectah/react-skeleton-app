import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as routes from './routes.json';
import * as AppContext from './App.context';

// import DemoComponent from '../components/DemoComponent';
// import DemoUi from '../ui/DemoUi';

import PageDashboard from '../view/page/Page.Dashboard';
import PageError from '../view/page/Page.Error';
import PageList from '../view/page/Page.List';
import PageForm from '../view/page/Page.Form';

class App extends Component {
	render() {
		return (
			<AppContext.Provider>
				<Router>
					<Switch>
						<Route path={routes.form.path} component={PageForm} />
						<Route path={routes.list.path} component={PageList} />
						<Route
							path={routes.dashboard.path}
							component={PageDashboard}
							exact
						/>

						<Route component={PageError} />
					</Switch>
				</Router>
			</AppContext.Provider>
		);
	}
}

export default App;
