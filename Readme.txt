To upgrade react-native:
> react-native upgrade

To see security issues with your packages:
> npm audit

To fix your packages
> npm audit fix

To install a certain version:
> npm install package_name@version_number

To see which packages are outdated:
> npm outdated

Becareful not to update package because there might be breaking API


Run app for Android/iOS, make sure you have the simulator running first:
> react-native run-ios
> react-native run-android

Debugging by following this isntruction: http://facebook.github.io/react-native/docs/debugging

Make sure to install NDK (side by side)

Release the app for Android:
https://facebook.github.io/react-native/docs/0.60/signed-apk-android

Handle 64bits release: https://shift.infinite.red/handling-64-bit-android-builds-for-react-native-2fcd7a2e5c14

Release the app for Apple:
To build for Release: Product -> Scheme -> Edit Scheme, then set to build for Release. Do the same for Debug

To get distribution package: Product-> Destination -> Generic iOS Device, then Archive menu will appear.

https://wiki.genexus.com/commwiki/servlet/wiki?34616,HowTo%3A+Create+an+.ipa+file+from+XCode

To update the app: https://help.apple.com/app-store-connect/#/dev480217e79
