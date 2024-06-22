import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fetchExchangeRates, fetchHistoricalRates } from '../utils/api';

const ExchangeRatesScreen = () => {
  const [rates, setRates] = useState({});
  const [historicalRates, setHistoricalRates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await fetchExchangeRates('USD');
        setRates(data.rates);
        const historicalData = await fetchHistoricalRates('USD');
        setHistoricalRates(historicalData);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
      setLoading(false);
    };
    fetchRates();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.title}>Current Exchange Rates</Text>
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
          <Text style={styles.title}>Historical Exchange Rates</Text>
          {historicalRates.map((historicalRate, index) => (
            <View key={index}>
              <Text style={styles.date}>{historicalRate.date}</Text>
              <FlatList
                data={Object.keys(historicalRate.rates)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <View style={styles.rateItem}>
                    <Text style={styles.currency}>{item}</Text>
                    <Text style={styles.rate}>{historicalRate.rates[item].toFixed(2)}</Text>
                  </View>
                )}
              />
            </View>
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
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
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default ExchangeRatesScreen;
