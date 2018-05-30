import React, {Component} from 'react';
import   './App.css';
class Header extends Component {
	render() {
		return(
			<header>
				<h3>React Forex Rates <span className='symbol'>&#x21C5;</span></h3>
			</header>
		);
	}
}
export default Header;