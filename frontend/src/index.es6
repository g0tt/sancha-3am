import React from 'react'
import ReactDOM from 'react-dom'

import './common.es6';

class TwitterAuthButton extends React.Component {
	auth() {
		window.location = "./auth/twitter"
	}

	render() {
		return (
			<button type="btn" className="btn btn-success" onClick={this.auth.bind(this)}>Twitterログイン</button>
		);
	}
}

class Page extends React.Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-default">
					<a className="navbar-brand" href="#">午前3時の三軒茶屋</a>
				</nav>
				<div className="container">
					<div className="text-center">
						<TwitterAuthButton/>
					</div>
					<p className="text-center">
						<a href="http://twitter.com/_gott" target="_blank">@_gott</a>
					</p>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Page/>,
	document.getElementById('react-root')
);