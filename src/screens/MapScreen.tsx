// src/screens/MapScreen.tsx
import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  TextInput,
  FlatList,
} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import {WebView} from 'react-native-webview';

type Place = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  menuUrl: string;
};

const PLACES: Place[] = [
  {
    id: '1',
    name: 'Reset Coffee & Bakery (İstanbul)',
    latitude: 41.0082, // İstanbul
    longitude: 28.9784,
    menuUrl:
      'https://qr-menu.simprasuite.com/reset-coffee-bakery/1/menu/0ecb02c2-3526-4586-94f0-e0301386f16d',
  },
  {
    id: '2',
    name: 'Sushico Akasya Acıbadem (Ankara civarı)',
    latitude: 39.9208, // Ankara
    longitude: 32.8541,
    menuUrl: 'https://akasya-acibadem-sushico.arimenu.com/',
  },
  {
    id: '3',
    name: 'Le Marla (İzmir)',
    latitude: 38.4237, // İzmir
    longitude: 27.1428,
    menuUrl: 'https://menu.myqrcodemenu.com/menu/le-marla-457dfb',
  },
  {
    id: '4',
    name: 'The Calm (Antalya)',
    latitude: 36.8969, // Antalya
    longitude: 30.7133,
    menuUrl: 'http://www.thecalm.com.tr/default.aspx#restaurant-menu',
  },
];

const MapScreen = () => {
  const mapRef = useRef<MapView | null>(null);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);
  const [isWebViewLoading, setIsWebViewLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const initialRegion: Region = {
    latitude: 39.0, // Türkiye ortalarına yakın
    longitude: 35.0,
    latitudeDelta: 8.0,
    longitudeDelta: 8.0,
  };

  const filteredPlaces = PLACES.filter(place =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const openMenu = () => {
    if (!selectedPlace) {
      return;
    }
    setWebViewUrl(selectedPlace.menuUrl);
    setIsWebViewLoading(true);
  };

  const closeMenu = () => {
    setWebViewUrl(null);
    setIsWebViewLoading(false);
  };

  const focusPlaceOnMap = (place: Place) => {
    setSelectedPlace(place);
    setShowResults(false);

    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: place.latitude,
          longitude: place.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        600,
      );
    }
  };

  const onSearchChange = (text: string) => {
    setSearchQuery(text);
    setShowResults(text.length > 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Arama kutusu + sonuç listesi */}
      <View style={styles.searchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Kafe / restoran ara..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
        {showResults && filteredPlaces.length > 0 && (
          <View style={styles.resultsContainer}>
            <FlatList
              data={filteredPlaces}
              keyExtractor={item => item.id}
              keyboardShouldPersistTaps="handled"
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => focusPlaceOnMap(item)}>
                  <Text style={styles.resultText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      {/* Harita */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        onPress={() => {
          setSelectedPlace(null);
          setShowResults(false);
        }}>
        {PLACES.map(place => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            title={place.name}
            pinColor="#FF7A00"
            onPress={() => setSelectedPlace(place)}
          />
        ))}
      </MapView>

      {/* Alt kart */}
      {selectedPlace && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.bottomCard}
          onPress={openMenu}>
          <Text style={styles.placeName}>{selectedPlace.name}</Text>
          <Text style={styles.tapToOpen}>Menüyü görmek için dokunun</Text>
        </TouchableOpacity>
      )}

      {/* Menü WebView (uygulama içi web sayfası) */}
      <Modal
        visible={webViewUrl !== null}
        animationType="slide"
        onRequestClose={closeMenu}>
        <SafeAreaView style={styles.webviewContainer}>
          <View style={styles.webviewHeader}>
            <Text style={styles.webviewTitle}>Menü</Text>
            <TouchableOpacity onPress={closeMenu}>
              <Text style={styles.webviewClose}>Kapat ✕</Text>
            </TouchableOpacity>
          </View>

          {webViewUrl && (
            <View style={styles.webviewBody}>
              {isWebViewLoading && (
                <View style={styles.webviewLoading}>
                  <ActivityIndicator size="large" />
                  <Text style={styles.webviewLoadingText}>
                    Menü yükleniyor...
                  </Text>
                </View>
              )}
              <WebView
                source={{uri: webViewUrl}}
                onLoadEnd={() => setIsWebViewLoading(false)}
                style={styles.webview}
              />
            </View>
          )}
        </SafeAreaView>
      </Modal>
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
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 16,
    right: 16,
    zIndex: 20,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#dddddd',
    color: '#000000',
  },
  resultsContainer: {
    marginTop: 4,
    maxHeight: 160,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  resultItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  resultText: {
    fontSize: 14,
    color: '#222222',
  },
  bottomCard: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  placeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  tapToOpen: {
    fontSize: 14,
    color: '#555555',
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webviewHeader: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dddddd',
  },
  webviewTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  webviewClose: {
    fontSize: 14,
    color: '#ff3b30',
    fontWeight: '600',
  },
  webviewBody: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  webviewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  webviewLoadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333333',
  },
});

export default MapScreen;
