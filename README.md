# About

# Installation

## Quickstart

Just copy `dist/jsog_bundle.html` to your favourite device and open it in your web browser.

## Build instructions

```
npm install --save-dev parcel
npx parcel build src/jslog.html
```

## Development notes

Optional Android ADB push (or use preferred method)

```
adb push dist/jslog.html /storage/self/primary/Download
```

For local development it is convenient to run a local development web server (otherwise
js imports would be blocked)

```
npm install http-server
npx http-server src # listen on localhost:8080 by default
```

# Acknowledgements
CSS taken from mutedblues (@mutedblues)
https://codepen.io/mutedblues/pen/MmPNPG

# Roadmap

- [x] flex 'callsign' column in table row
- [x] move js and css to separate dirs and test w/bundler
- [x] switch between list and editing button - for now, we are using the app name/logo
- [x] switch qso edit / list mode
- [ ] save qso from form
- [ ] display qsos in list
- [ ] edit qso from list (edit mode)
- [ ] clear list
- [ ] export adif
- [ ] date editor
- [ ] time editor
- [ ] datetime auto-advancer (turn off when field touched before save, turn off when editing existing qso)
- [ ] json upload
- [ ] qso variables editor
- [ ] manage >1 logs on device
- [ ] a nice icon for mode switch button

