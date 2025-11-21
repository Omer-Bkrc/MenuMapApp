# CafeMapApp

☕ **CafeMapApp**\
React Native ile geliştirilmiş, kafe & restoran menülerine harita
üzerinden erişim sağlayan mobil uygulama.

Bu proje şu anda MVP aşamasındadır: - Kullanıcı harita üzerinde
mekanları görebilir - Marker'a tıklayınca menü + yorum kartı açılır -
Profil sekmesi vardır - Alt bar *custom* olarak yazılmıştır - Kod yapısı
tamamen temiz ve stabil kuruludur

------------------------------------------------------------------------

## 🚀 Proje Teknolojileri & Sürüm Bilgileri

  Teknoloji / Araç    Sürüm
  ------------------- ---------------
  React Native        0.75.5
  react-native-maps   1.20.1
  Java JDK            17
  Node.js             20.19.5
  npm                 10.8.2
  Android SDK         34+
  CocoaPods           Kullanılmıyor

------------------------------------------------------------------------

## 📦 Projeyi Yeni Bilgisayarda Kurma

### 1. Repo'yu klonla

``` bash
git clone https://github.com/<username>/CafeMapApp.git
cd CafeMapApp
```

### 2. Bağımlılıkları yükle

``` bash
npm install
```

### 3. Android build temizliği

``` bash
cd android
./gradlew clean
cd ..
```

### 4. Android'de çalıştır

``` bash
npx react-native run-android
```

------------------------------------------------------------------------

## 🗺️ Uygulama Özellikleri

-   ✔ Harita Görünümü (MapScreen)\
-   ✔ Marker + Menü + Yorum kartı\
-   ✔ Profil sekmesi\
-   ✔ Custom alt tab bar\
-   ✔ Navigation kütüphanesi yok (tam stabil)

------------------------------------------------------------------------

## 🔧 Proje Yapısı

    CafeMapApp/
    ├── App.tsx
    ├── src/
    │   └── screens/
    │       ├── MapScreen.tsx
    │       └── ProfileScreen.tsx
    ├── android/
    ├── ios/
    └── package.json

------------------------------------------------------------------------

## 🔑 Google Maps API Key

`android/app/src/main/AndroidManifest.xml` içinde meta-data olarak
bulunur.

------------------------------------------------------------------------

## 🎯 MVP Durumu

-   ✔ Harita çalışıyor\
-   ✔ Marker açılır kart\
-   ✔ Profil ekranı\
-   ✔ Custom tab bar\
-   ✔ Stabil yapı\
-   ✔ GitHub'a yüklendi

------------------------------------------------------------------------

## 🛠️ Roadmap -- Yakında Eklenecek

1.  WebView ile menü linki açma\
2.  Firebase Auth\
3.  Firestore veri yapısı\
4.  Dinamik marker yükleme\
5.  Admin paneli

------------------------------------------------------------------------

## 🧹 Kod Standartları

-   Navigation yok → custom tab bar\
-   Tam JS/TS tabanlı yapı\
-   Android optimize\
-   iOS sonradan eklenebilir

------------------------------------------------------------------------

## ⚠️ Önemli Not

Bu proje **npm** ile kurulmuştur.\
Yeni bilgisayarda mutlaka:

``` bash
npm install
```

kullanılmalıdır.

------------------------------------------------------------------------

## ✔ Lisans

Proje **Ömer Bakırcı** tarafından geliştirilmiştir.

------------------------------------------------------------------------

## 🎉 Son

Bu README ile proje kurulumu ve geliştirme süreci tamamen kayıt
altındadır.
