# ScipholFlight
 <h2>Minimum Requirements</h2>
 Anroid: minSdkVersion: 21
 
 iOS: 11.0
 
 <h2>3rd Party Packages</h2>
 
 - Local Storage\
 @react-native-async-storage/async-storage: 1.17.8
 - Date/Time Picker\
 @react-native-community/datetimepicker: 6.3.1
 - Navigation/Tab Bar\
 @react-navigation/bottom-tabs: 6.3.2\
 @react-navigation/native: 6.0.11
 - UIKit for (Buttons, FABs, Dialogs, Inputs)\
 @rneui/base: 4.0.0-rc.6\
 @rneui/themed: 4.0.0-rc.6
 - Icons\
 @types/react-native-vector-icons: 6.4.11\
 react-native-vector-icons: 9.2.0
 - QR Code Scanner\
 expo: 46.0.0\
 expo-barcode-scanner: 11.4.0
 - Dropdown Component\
 react-native-element-dropdown: 2.1.0
 - QR Code Generator\
 react-native-qrcode-svg: 6.1.2
 - List Component\
 recyclerlistview: 4.1.3
 
  <h2>Usage Details</h2>
  
  <h3>Flights Screen</h3>
  
  
  Search flights using the filter dialog via action menu
  
  <img src="https://user-images.githubusercontent.com/61357620/183943663-e0af7373-391d-49de-92df-a90bf8f20460.png" width="225" height="400"/> <img src="https://user-images.githubusercontent.com/61357620/183943756-dff137c4-9273-4366-89c8-34b40cce4786.png" width="225" height="400"/> <img src="https://user-images.githubusercontent.com/61357620/183943932-668e1de5-6863-46b0-abec-0fce56daa84c.png" width="225" height="400"/> <img src="https://user-images.githubusercontent.com/61357620/183944094-cdcab688-fcff-4693-abbe-23b6abbfe41c.png" width="225" height="400"/>

Tap on a flight to see flight details

<img src="https://user-images.githubusercontent.com/61357620/183945331-e2ac81e6-df0b-4e8f-ac2c-ff11805a3dc2.png" width="225" height="400"/>

Tap on the shopping chart icon to book a flight (QR code needs to be screenshotted temporarily due to issues with CameraRoll)

<img src="https://user-images.githubusercontent.com/61357620/183945755-2ce54a1c-f808-4e7e-bc5b-d47adea9c247.png" width="225" height="400"/>

Tap on the QR scanner action button via action menu to scan QR codes

<img src="https://user-images.githubusercontent.com/61357620/183946727-d2e1ab0e-fcc2-454e-8e77-b225d4fcefb2.png" width="225" height="400"/>     <img src="https://user-images.githubusercontent.com/61357620/183946875-233415bf-501b-40ba-9325-7a4e22ae369a.png" width="225" height="400"/>

<h3>Past and Future Flights</h3>

Past and future flights can be displayed on My Flights tab

<img src="https://user-images.githubusercontent.com/61357620/183948085-109d7646-3cf5-4ecb-8223-dd8f39254eda.png" width="225" height="400"/>

<h2>Notes</h2>

- Saving QR codes to camera roll is not possible due to a @react-native-community/cameraroll issue.
- QR Code Scanner isn't tested on iOS due to an issue with expo-Barcode-Scanner and when Xcode is <v13.
 


