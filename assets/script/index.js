'use strict';

import { onEvent, select, selectById, selectAll, print } from "./utility.js";

const scrollToTopBtn = selectById('scrollToTopBtn');
const menu = selectById('hamburger');
const navbar = select('.menus');
const buttons = selectAll('.btn');
const sections = selectAll('.part');
const about = select('.about');
const keyFeatures = select('.keyFeatures');
const contact = select('.link');

buttons.forEach((button) => {
    onEvent('click', button, () => {
        if (button.classList.contains('aboutEco')) about.scrollIntoView({ behavior: 'smooth' });
        if (button.classList.contains('keyFeature')) keyFeatures.scrollIntoView({ behavior: 'smooth' });
        if (button.classList.contains('contacts')) contact.scrollIntoView({ behavior: 'smooth' });
        navbar.style.display = 'none';
    });
});

onEvent('click', scrollToTopBtn, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

onEvent('scroll', window, () => {
    if (window.pageYOffset > 100) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

onEvent('click', menu, () => {
    navbar.style.display = (navbar.style.display === 'block') ? 'none' : 'block';
});

function checkWindowWidth() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1004) {
        navbar.style.display = 'none';
    }
}

onEvent('resize', window, () => {
    checkWindowWidth();
});

mapboxgl.accessToken = 
'pk.eyJ1Ijoic2F6aWUxMDEiLCJhIjoiY2xxMTlpdmppMDN4MjJpcjJmMWEwMGtocyJ9.E-0dRa3RSkJ5qftTffADcQ';

function showMarker(map, position) {
    new mapboxgl.Marker()
        .setLngLat([position.coords.longitude, position.coords.latitude])
        .addTo(map);
}

function makMap(position) {
    let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v12', // stylesheet location
        center: [position.coords.longitude, position.coords.latitude], // starting position [lng, lat]
        zoom: 16 // starting zoom level
    });

    showMarker(map, position);
}

function errorHandler() {
    console.log('Unable to retrieve your location');
}

if ('geolocation' in navigator) {
    const geo = navigator.geolocation;
    geo.getCurrentPosition(makMap, errorHandler);
} else {
    console.log('Geolocation API is not supported by your browser');
}