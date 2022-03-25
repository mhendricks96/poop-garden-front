import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';// IonItem, IonAvatar, IonImg, IonLabel, IonList
// import ExploreContainer from '../components/ExploreContainer';
import React from 'react';
// import axios from 'axios';
import './Tab2.css';
// import Card from '../components/Card'
import Charty from '../components/Charty/charty';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../components/Login/LoginButton'
import LogoutButton from '../components/Login/LogoutButton'




// type Friend = {
//   name: string;
//   height: string;
//   mass: string;
// }

const Tab2: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const userEmail = user?.email;
  
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log(user);

  return (
    
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isAuthenticated? 'Welcome to my Poop Garden!': userEmail}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>{isAuthenticated? 'Welcome to my Poop Garden!': userEmail}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {isAuthenticated ?
        <div>
          <LogoutButton />
          <Charty /> 
        </div>:
          <LoginButton />
        }
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
