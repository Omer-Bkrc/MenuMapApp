// App.tsx
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import MapScreen from './src/screens/MapScreen';
import ProfileScreen from './src/screens/ProfileScreen';

type Tab = 'map' | 'profile';

const App = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>('map');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {selectedTab === 'map' ? <MapScreen /> : <ProfileScreen />}
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setSelectedTab('map')}>
          <Text
            style={[
              styles.tabLabel,
              selectedTab === 'map' && styles.tabLabelActive,
            ]}>
            🗺 Harita
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setSelectedTab('profile')}>
          <Text
            style={[
              styles.tabLabel,
              selectedTab === 'profile' && styles.tabLabelActive,
            ]}>
            👤 Profil
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  content: {flex: 1},
  tabBar: {
    height: 60,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fafafa',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 14,
    color: '#777',
  },
  tabLabelActive: {
    color: '#000',
    fontWeight: '700',
  },
});

export default App;
