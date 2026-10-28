import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { apiFetch } from '../services/api'; // Menggunakan apiFetch dari dosen

export default function RegisterScreen() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nama || !email || !password) {
      Alert.alert('Peringatan', 'Semua kolom harus diisi!');
      return;
    }

    try {
      setLoading(true);
      
      // Memanggil apiFetch sesuai struktur dari dosen
      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ nama, email, password }),
      });
      
      Alert.alert('Sukses 🎉', 'Akun berhasil didaftarkan! Silakan login.', [
        { text: 'OK', onPress: () => router.replace('/sign-in') }
      ]);
    } catch (error) {
      Alert.alert('Registrasi Gagal', error.message || 'Terjadi kesalahan saat registrasi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Daftar Akun ✨</Text>
        <Text style={styles.subtitle}>Buat akun baru untuk mulai menguji modul.</Text>

        <TextInput
          style={styles.input}
          placeholder="Nama Lengkap"
          placeholderTextColor="#A99292"
          value={nama}
          onChangeText={setNama}
        />

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

        <Pressable style={styles.button} onPress={handleRegister} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Memproses...' : 'Daftar'}</Text>
        </Pressable>

        <Pressable style={styles.linkContainer} onPress={() => router.push('/sign-in')}>
          <Text style={styles.linkText}>Sudah punya akun? <Text style={styles.linkBold}>Login di sini</Text></Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5', // Soft Pink
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