# Map Marklet

Map Marklet is a Chrome extension that lets users save urls to markers on a personal instance of Google Maps.

![popup](./images/map-marklet-popup.png "Popup")
![main-page](./images/map-marklet-main.png "Main")

## Motivation

While planning for road trips, I often save bookmarks to many websites which I then reference later. However, it's difficult to know the locations the websites refer to. This Chrome extension helps users locate the places that the websites refer to on a map.

## Demo
[demo](https://www.youtube.com/watch?v=Huez-gjI3Pg&feature=youtu.be)

## Installation
- In Chrome, More tools > Extensions, select developer mode.
- Click button 'Load unpacked extension' and select the build folder.
- For development, go to the repo and run `npm i` then `gulp watch`

## Tech Stack
- React + Redux
- Google Maps Api
- Chrome Api

## In development
- User authentication via Chrome oauth2
- Adding capability for user to save multiple maps/trips
