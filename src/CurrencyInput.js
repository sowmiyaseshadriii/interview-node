import React, {Component} from 'react';


class CurrencyInput extends Component {
	
	constructor(props) {
		super(props);
		this.handleInputClick = this.handleInputClick.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCurrencyChange= this.handleCurrencyChange.bind(this);
	}
	
	handleInputClick(e) {
		this.props.onInputClick(this.props.selected, e.target.value);
	}
	
	handleInputChange(e) {
		this.props.onInputChange(e.target.value);
	}
	
	handleCurrencyChange(e) {
		this.props.onCurrencyChange(e.target.value, this.props.position);
	}
	
	render() {
		const { currencies, selected, value } = this.props;
		return(
            
			<fieldset>
				<legend>{selected}</legend>
               
				<input
					value={value}
					onChange={this.handleInputChange}
					onClick={this.handleInputClick} />
				<select onChange={this.handleCurrencyChange}>
					{
						currencies.map(
							currency => {
								if(currency === selected) {
									return(
										<option key={currency} value={currency} selected>{currency}</option>
									);
								} else {
									return(
										<option key={currency} value={currency}>{currency}</option>
									);
								}
							}
						)
					}
				</select>
                
			</fieldset>
           
            
        );
    
	}
}

export default CurrencyInput;