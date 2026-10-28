import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { getMe } from '../../services/authService';

export default function ProfileScreen() {
  const { token, signOut } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getMe(token).then(setProfile).catch(console.error);
  }, [token]);

  if (!profile) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#A85C68" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Avatar Ikon */}
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={48} color="#A85C68" />
        </View>

        <Text style={styles.title}>Profil Pengguna ✨</Text>
        <Text style={styles.subtitle}>Informasi akun yang sedang aktif</Text>

        {/* Informasi Detail Profil */}
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color="#A85C68" style={styles.icon} />
            <Text style={styles.label}>Nama:</Text>
            <Text style={styles.value}>{profile.nama}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={20} color="#A85C68" style={styles.icon} />
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{profile.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="id-card-outline" size={20} color="#A85C68" style={styles.icon} />
            <Text style={styles.label}>ID:</Text>
            <Text style={styles.value}>{profile.id}</Text>
          </View>
        </View>

        {/* Tombol Kembali ke Home */}
        <Pressable style={styles.primaryButton} onPress={() => router.back()}>
          <Text style={styles.primaryButtonText}>Kembali</Text>
        </Pressable>

        {/* Tombol Logout */}
        <Pressable style={styles.secondaryButton} onPress={signOut}>
          <Text style={styles.secondaryButtonText}>Logout</Text>
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
  loaderContainer: {
    flex: 1,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#D87093',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#FFB6C1',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#A85C68',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#8C7878',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#FFF0F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFE4E1',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8C7878',
    width: 60,
  },
  value: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#FFB6C1',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#5C3A42',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#FFB6C1',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    width: '100%',
  },
  secondaryButtonText: {
    color: '#A85C68',
    fontSize: 15,
    fontWeight: '600',
  },
});