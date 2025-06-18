// Firebase Configuration Template
// Replace these values with your actual Firebase project configuration

export const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Instructions to set up Firebase:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project or select existing one
// 3. Go to Project Settings > General > Your apps
// 4. Click "Add app" and select Web (</>) 
// 5. Register your app and copy the config object
// 6. Replace the values above with your actual config
// 7. Enable Firestore Database in the Firebase console
// 8. Set up Firestore security rules as needed

// Example Firestore Security Rules for this app:
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sensitivity-configs/{document} {
      allow read, write: if true; // Allow all for now, customize as needed
    }
  }
}
*/