import React, {Component} from 'react';
import CurrencyInput from './CurrencyInput';
import Header from './header';
import   './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currencies: [],
			currencyNo1: 'EUR',
			currencyNo2: 'CZK',
			inputCurrency: '?',
			outputCurrency: '?',
			rate: 0,
			value: '',
			date: 'yyyy-mm-dd'
		}
		this.updateConversion = this.updateConversion.bind(this);
		this.updateCurrency = this.updateCurrency.bind(this);
		this.updateValue = this.updateValue.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
	}

	componentDidMount() {
		fetch('https://api.fixer.io/latest')
		.then(data => data.json())
		.then(data => {
			const currencies = [];
			currencies.push(data.base, ...Object.entries(data.rates).map(rates => rates[0]));
			currencies.sort();
			this.setState( { currencies } );
		})
		.catch(err => console.log(err));
	}
	
	updateConversion(inputCurrency, value) {
		const { currencyNo1, currencyNo2 } = this.state;
		const outputCurrency = inputCurrency === currencyNo1 ? currencyNo2 : currencyNo1; 
		fetch(`https://api.fixer.io/latest?base=${inputCurrency}`)
			.then(data => data.json())
			.then(data => {
				this.setState(
					{ 
						inputCurrency, 
						outputCurrency, 
						rate: data.rates[outputCurrency] || 1, 
						date: data.date,
						value
					}
				)
			})
			.catch(err => console.log(err))
	}
	
	updateValue(value) {
		this.setState(
			{ value }
		);
	}
	
	
	updateCurrency(currency, position) {
		this.setState(
			{ value: '', rate: 0, inputCurrency: '', outputCurrency: '' }
		);
		if(position === 1) {
			this.setState(
				{ currencyNo1: currency }
			);
		}
		if(position === 2) {
			this.setState(
				{ currencyNo2: currency }
			);
		}
	}

	handleClearForm(e) {
		e.preventDefault();
		this.setState({
		
			currencyNo1: 'EUR',
			currencyNo2: 'CZK',
			inputCurrency: '?',
			outputCurrency: '?',
			rate: 0,
			value: '',
			date: 'yyyy-mm-dd'
		});
	}
	render() {		
		const { currencies, currencyNo1, currencyNo2, inputCurrency, rate, date, value } = this.state;
		const newValue = value.replace('.', ',');
		const value1 = currencyNo1 === inputCurrency ? newValue : tryConvert(value, rate);
		const value2 = currencyNo2 === inputCurrency ? newValue : tryConvert(value, rate);
		return(
			<div>
				<Header/>
				<CurrencyInput 
					position={1}
					currencies={currencies}
					selected={currencyNo1}
					value={value1}
					onInputClick={this.updateConversion}
					onInputChange={this.updateValue}
					onCurrencyChange={this.updateCurrency} className="currency" />
				
				<CurrencyInput 
					position={2}
					currencies={currencies}
					selected={currencyNo2}
					value={value2}
					onInputClick={this.updateConversion}
					onInputChange={this.updateValue}
					onCurrencyChange={this.updateCurrency} className="currency" />
				<section className='conversion-info'>
					<p>Rate: {rate}</p>
					<p>Latest update: {date}</p>
				</section>
				<button
						className="btn info"
						onClick={this.handleClearForm}>Reset</button>
			</div>
		);
	}
}


export default App;

function multiplay( variable, coefficient ) {
	return ( Math.round( (variable * coefficient) * 1000000 ) / 1000000 ).toString();
}

function tryConvert( value, rate ) {
	const variable = parseFloat(value.replace(',', '.'));
	const coefficient = parseFloat(rate);
	return Number.isNaN(variable) ? '' : (multiplay(variable, coefficient)).replace('.', ',');
}