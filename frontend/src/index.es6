import React from 'react'
import ReactDOM from 'react-dom'

class Page extends React.Component {
	render() {
		return (
			<span>hogehoge</span>
		);
	}
}

ReactDOM.render(
	<Page/>,
	document.getElementById('react-root')
);