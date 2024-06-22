
async function convertCurrency(amount, fromCurrency, toCurrency) {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
        }
        const data = await response.json();
        const rate = data.rates[toCurrency];
        if (!rate) {
            throw new Error(`Currency conversion rate not available for ${fromCurrency} to ${toCurrency}`);
        }
        const convertedAmount = amount * rate;
        return convertedAmount.toFixed(0);
    } catch (error) {
        console.error('Error converting currency:', error.message);
        return null;
    }
}

export default convertCurrency;