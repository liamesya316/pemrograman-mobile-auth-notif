import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

export default function AppLayout() {
  const router = useRouter();
  const notificationListener = useRef();
  const responseListener = useRef();

  // Langkah 29: Menambahkan Notification Listener untuk menangani interaksi notifikasi
  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notifikasi Diterima di Foreground:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      if (data?.screen) {
        router.push(`/${data.screen}`);
      }
    });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: '#FFF0F5' } // Memastikan background bernuansa Soft Pink
      }} 
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}