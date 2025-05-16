import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

const currencies = ['USD', 'CNY', 'EUR', 'JPY'];

type RecordItem = {
  id: string;
  amount: number;
  currency: string;
  type: 'income' | 'expense';
};

export default function Bookkeeping() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [records, setRecords] = useState<RecordItem[]>([]);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const addRecord = () => {
    if (!amount) return;
    const newRecord: RecordItem = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      currency,
      type,
    };
    setRecords([newRecord, ...records]);
    setAmount('');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
        Multi-currency Bookkeeping App
      </Text>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Amount:</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? '#222' : '#f9f9f9',
              color: isDark ? '#fff' : '#000',
            },
          ]}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          placeholderTextColor={isDark ? '#888' : '#999'}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Currency:</Text>
        <Picker
          selectedValue={currency}
          style={{ height: 50, flex: 1, color: isDark ? '#fff' : '#000' }}
          onValueChange={setCurrency}
        >
          {currencies.map((cur) => (
            <Picker.Item key={cur} label={cur} value={cur} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Type:</Text>
        <Picker
          selectedValue={type}
          style={{ height: 50, flex: 1, color: isDark ? '#fff' : '#000' }}
          onValueChange={setType}
        >
          <Picker.Item label="Income" value="income" />
          <Picker.Item label="Expense" value="expense" />
        </Picker>
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#4caf50' }]} onPress={addRecord}>
        <Text style={styles.buttonText}>Add Record</Text>
      </TouchableOpacity>

      <FlatList
        style={{ marginTop: 20 }}
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.recordCard, { backgroundColor: isDark ? '#1e1e1e' : '#fafafa' }]}>
            <Text style={{ color: isDark ? '#fff' : '#000', fontWeight: '600' }}>
              {item.type === 'income' ? 'Income' : 'Expense'}
            </Text>
            <Text style={{ color: isDark ? '#ccc' : '#333' }}>
              {item.amount} {item.currency}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputGroup: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  label: { width: 80, fontSize: 16 },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  recordCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});
