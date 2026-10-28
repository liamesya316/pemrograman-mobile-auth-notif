import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Peringatan', 'Email dan password harus diisi!');
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      router.replace('/(app)');
    } catch (error) {
      console.log('Detail Error Login:', error);
      const msg = error.message || 'Email atau password salah!';
      Alert.alert('Login Gagal', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Selamat Datang ✨</Text>
        <Text style={styles.subtitle}>Silakan login untuk masuk ke aplikasi.</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A99292"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A99292"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Memproses...' : 'Login'}</Text>
        </Pressable>

        <Pressable style={styles.linkContainer} onPress={() => router.push('/register')}>
          <Text style={styles.linkText}>Belum punya akun? <Text style={styles.linkBold}>Daftar di sini</Text></Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#D87093',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#B76E79',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#8C7878',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF9FB',
    borderWidth: 1,
    borderColor: '#FFE4E1',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#4A3B3B',
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#FFB6C1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 14,
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#4A3B3B',
    fontSize: 16,
    fontWeight: '600',
  },
  linkContainer: {
    alignItems: 'center',
  },
  linkText: {
    color: '#8C7878',
    fontSize: 14,
  },
  linkBold: {
    color: '#B76E79',
    fontWeight: 'bold',
  },
});