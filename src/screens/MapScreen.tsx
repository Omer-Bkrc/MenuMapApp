// src/screens/MapScreen.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

type MenuItem = {
  name: string;
  price: number;
};

type Review = {
  user: string;
  rating: number;
  comment: string;
};

type Place = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  menu: MenuItem[];
  reviews: Review[];
};

const PLACES: Place[] = [
  {
    id: '1',
    name: 'Demo Cafe',
    latitude: 41.0082,
    longitude: 28.9784,
    menu: [
      { name: 'Latte', price: 80 },
      { name: 'Espresso', price: 60 },
      { name: 'Cappuccino', price: 75 },
    ],
    reviews: [
      { user: 'Ali', rating: 5, comment: 'Kahve harika, ortam çok güzel.' },
      { user: 'Ayşe', rating: 4, comment: 'Fiyatlar biraz yüksek ama değer.' },
    ],
  },
  {
    id: '2',
    name: 'Demo Restaurant',
    latitude: 41.015137,
    longitude: 28.97953,
    menu: [
      { name: 'Burger', price: 150 },
      { name: 'Pizza', price: 180 },
    ],
    reviews: [
      { user: 'Mehmet', rating: 4, comment: 'Porsiyonlar büyük, lezzetli.' },
    ],
  },
];

const MapScreen = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const initialRegion: Region = {
    latitude: 41.01,
    longitude: 28.97,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onPress={() => setSelectedPlace(null)}
      >
        {PLACES.map(place => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            title={place.name}
            onPress={() => setSelectedPlace(place)}
          />
        ))}
      </MapView>

      {selectedPlace && (
        <View style={styles.bottomCard}>
          <Text style={styles.placeName}>{selectedPlace.name}</Text>

          <Text style={styles.sectionTitle}>Menü</Text>
          <ScrollView style={styles.menuList}>
            {selectedPlace.menu.map(item => (
              <Text key={item.name} style={styles.menuItem}>
                {item.name} — {item.price}₺
              </Text>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Yorumlar</Text>
          <ScrollView style={styles.reviewList}>
            {selectedPlace.reviews.map((r, index) => (
              <Text key={index} style={styles.reviewItem}>
                <Text style={styles.reviewUser}>{r.user}</Text>
                <Text style={styles.reviewRating}> ({r.rating}/5): </Text>
                <Text style={styles.reviewComment}>{r.comment}</Text>
              </Text>
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  map: {
    flex: 1,
  },
  bottomCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    maxHeight: '55%',
  },
  placeName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#000000',
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 4,
    fontWeight: '600',
    fontSize: 14,
    color: '#000000',
  },
  menuList: {
    maxHeight: 80,
  },
  menuItem: {
    fontSize: 14,
    color: '#333333',
  },
  reviewList: {
    maxHeight: 80,
    marginTop: 4,
  },
  reviewItem: {
    fontSize: 13,
    color: '#333333',
    marginBottom: 2,
  },
  reviewUser: {
    fontWeight: '600',
    color: '#000000',
  },
  reviewRating: {
    fontWeight: '500',
    color: '#000000',
  },
  reviewComment: {
    color: '#333333',
  },
});

export default MapScreen;
