import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const ExchangeRatesScreen = () => {
  const [rates, setRates] = useState({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://api.exchangeratesapi.io/latest?base=USD');
        setRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };
    fetchExchangeRates();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(rates)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.rateItem}>
            <Text style={styles.currency}>{item}</Text>
            <Text style={styles.rate}>{rates[item].toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  rateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  currency: {
    fontSize: 16,
  },
  rate: {
    fontSize: 16,
  },
});

export default ExchangeRatesScreen;
