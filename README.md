# About

The aim is to have a pure JS+CSS single-page application that can be compiled into a single
HTML file and used without any web server. It relies on localStorage, exports an ADIF file
and uploads to on-line services.

This is a work in progress and not usable at the moment.

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
js imports would be blocked). The final single-file version in dist does not require a
running web server after it has been bundled.

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
- [x] save qso from form
- [x] display qsos in list
- [x] reinit qso list from the log in memory
- [x] clear qso in the editor
- [x] edit qso from list (edit mode)
- [x] clear list as UI action
- [ ] confirm before clear list
- [ ] export adif
- [ ] date editor
- [ ] time editor
- [ ] datetime auto-advancer (turn off when field touched before save, turn off when editing existing qso)
- [ ] json upload
- [ ] qso variables editor
- [ ] manage >1 logs on device
- [ ] a nice icon for mode switch button
- [ ] date validator
- [ ] utc validator
- [ ] rst validator
- [ ] callsign uppercase tranform
- [ ] qso should be a formalized data class instance
- [ ] qso editor - keep previous values like date/time/mode/freq (from previous saved qso, pileup mode)
- [ ] when editing a qso, cache the data in the editor so that anything in progress is not overwritten

