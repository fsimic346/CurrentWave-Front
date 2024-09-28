import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'currentwave-563b3',
        appId: '1:214702271750:web:4bf5a93092d8b0757c8287',
        storageBucket: 'currentwave-563b3.appspot.com',
        //@ts-ignore
        locationId: 'europe-central2',
        apiKey: 'AIzaSyATMkQlyO2nL_yKV3uwz-OuY_IAMZtX_-A',
        authDomain: 'currentwave-563b3.firebaseapp.com',
        messagingSenderId: '214702271750',
        measurementId: 'G-12H1ZL3EYH',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
  ],
};
