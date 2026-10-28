export async function kirimExpoPush(expoPushToken, pesan) {
  const response = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: expoPushToken,
      sound: 'default',
      title: pesan.title,
      body: pesan.body,
      data: pesan.data || {},
    }),
  });

  // Cek dulu apakah respons gagal SEBELUM memanggil .json()
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Expo Push Error Response:', errorText);
    throw new Error(`Gagal mengirim ke Expo Push Service: ${response.status} ${errorText}`);
  }

  const result = await response.json();
  return result;
}