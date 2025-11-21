// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ProfileScreen = () => {
  const isLoggedIn = false; // Şimdilik sahte, sonra Firebase'e bağlarız

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.subtitle}>
          Giriş yapmadın. Menülere bakabilirsin ama profil ve admin özellikleri için giriş yapman gerekiyor.
        </Text>
        <Button
          title="Giriş Yap / Kayıt Ol"
          onPress={() => {
            // ileride: login ekranına yönlendirme
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Merhaba, Kullanıcı!</Text>
      <Text>Burada profil bilgilerini ve admin isen yeni mekan ekleme butonlarını göstereceğiz.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
  subtitle: { fontSize: 14, marginBottom: 16 },
});

export default ProfileScreen;
