import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';// IonItem, IonAvatar, IonImg, IonLabel, IonList
// import ExploreContainer from '../components/ExploreContainer';
import React, {useState} from 'react';
import axios from 'axios';
import './Tab1.css';
import Card from '../components/Card'


type Friend = {
  name: string;
  height: string;
  mass: string;
}


const Tab1: React.FC = () => {
  //creating list to be held in state
  const [listItems, setListItems] = useState<any>([])

  // function that communicates with the server
  const sendRequest = () => {
    return axios
      .get('https://swapi.dev/api/people',{
      headers:{
        'Content-Type': 'application/json'
      },
      })
      .then((response) => {
      return response.data;
      })
  };

  // Use effect to run function

  React.useEffect(() => {
    sendRequest().then(data => {
      setListItems(data.results)
    });
  }, []);

  // console.log(listItems);
  return (
    
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>people</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>people</IonTitle>
          </IonToolbar>
        </IonHeader>
        {listItems?.map((Friend: Friend, index: number) => (
          <Card
            key={index}
            title={Friend.name}
            content={Friend.height}
            subtitle={Friend.mass}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
