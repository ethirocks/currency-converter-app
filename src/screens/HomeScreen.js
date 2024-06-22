import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Spinner from 'react-native-loading-spinner-overlay';
import { fetchExchangeRates } from '../utils/api';
import { formatNumberWithCommas } from '../utils/format';

const currencies = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' },
  { label: 'JPY', value: 'JPY' },
  { label: 'AUD', value: 'AUD' },
  { label: 'INR', value: 'INR' },
  { label: 'CAD', value: 'CAD' },
  { label: 'CNY', value: 'CNY' },
  { label: 'CHF', value: 'CHF' },
  { label: 'NZD', value: 'NZD' },
  // Add more currencies as needed
];

const HomeScreen = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [conversionResult, setConversionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConversion = async () => {
    setLoading(true);
    try {
      const data = await fetchExchangeRates(fromCurrency);
      const rate = data.rates[toCurrency];
      const result = (parseFloat(amount.replace(/,/g, '')) * rate).toFixed(2);
      setConversionResult(formatNumberWithCommas(result));
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
    setLoading(false);
  };

  const handleAmountChange = (text) => {
    const formattedAmount = text.replace(/[^0-9.]/g, '');
    setAmount(formattedAmount);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} textContent={"Loading..."} textStyle={styles.spinnerTextStyle} />
      <Text style={styles.title}>Currency Converter</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={formatNumberWithCommas(amount)}
        onChangeText={handleAmountChange}
        keyboardType="numeric"
      />
      <RNPickerSelect
        onValueChange={(value) => setFromCurrency(value)}
        items={currencies}
        style={pickerSelectStyles}
        value={fromCurrency}
        placeholder={{ label: 'From Currency', value: null }}
      />
      <RNPickerSelect
        onValueChange={(value) => setToCurrency(value)}
        items={currencies}
        style={pickerSelectStyles}
        value={toCurrency}
        placeholder={{ label: 'To Currency', value: null }}
      />
      <Button title="Convert" onPress={handleConversion} />
      {conversionResult && (
        <Text style={styles.result}>
          {formatNumberWithCommas(amount)} {fromCurrency} = {conversionResult} {toCurrency}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    textAlign: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  inputAndroid: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
