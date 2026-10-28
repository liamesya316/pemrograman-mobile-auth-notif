import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as Notifications from 'expo-notifications'; // ⬅️ Tambahkan import ini

// 1. ATUR AGAR NOTIFIKASI MUNCUL SEBAGAI BANNER MESKI APLIKASI DIBUKA
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,   // Memunculkan banner pop-up di atas layar
    shouldPlaySound: true,   // Membunyikan suara notifikasi
    shouldSetBadge: false,
  }),
});

function InitialLayout() {
  const { token, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(app)';

    if (!token && inAuthGroup) {
      // Jika belum login tapi berada di area privat, lempar ke halaman login
      router.replace('/sign-in');
    } else if (token && !inAuthGroup) {
      // Jika sudah login tapi masih di halaman auth, lempar ke beranda
      router.replace('/(app)');
    }
  }, [token, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF0F5' }}>
        <ActivityIndicator size="large" color="#B76E79" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}