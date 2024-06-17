import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [conversionResult, setConversionResult] = useState(null);

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}`);
      const rate = response.data.rates[toCurrency];
      setConversionResult((amount * rate).toFixed(2));
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="From Currency"
        value={fromCurrency}
        onChangeText={setFromCurrency}
      />
      <TextInput
        style={styles.input}
        placeholder="To Currency"
        value={toCurrency}
        onChangeText={setToCurrency}
      />
      <Button title="Convert" onPress={fetchExchangeRate} />
      {conversionResult && (
        <Text style={styles.result}>
          {amount} {fromCurrency} = {conversionResult} {toCurrency}
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
  },
});

export default HomeScreen;
