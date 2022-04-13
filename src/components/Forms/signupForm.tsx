import { IonItem, IonButton, IonInput, useIonRouter } from '@ionic/react';
import React, { useState } from 'react';
// import { useAuth } from '../../contexts/auth.js';
import useResourceUsers from '../../hooks/useResourceUsers'
// import { UserStore } from '../../store';
// import { useStoreState } from 'pullstate';
// import { getUserInfo } from '../../store/Selectors';



const SignupForm: React.FC = () => {

  const [tempName, setTempName] = useState<string>();
  const [tempPassword, setTempPassword] = useState<any>();
  const [tempEmail, setTempEmail] = useState<any>();
  const router = useIonRouter();
  // const { user, login, logout } = useAuth();
  const { createResourceUsers } = useResourceUsers();
  // const userInfo = useStoreState(UserStore, getUserInfo)

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // login(tempName, tempPassword)
    createResourceUsers({
      username: tempName,
      email: tempEmail,
      password: tempPassword
    })
    // login(tempName, tempPassword)
    router.push('/tab1')
  }

  return (
    <form onSubmit={(e) => {handleSubmit(e)}
        }>
          <IonItem>
            <IonInput  placeholder="Enter Name" onIonChange={e => setTempName(e.detail.value!)}></IonInput>
          </IonItem>
          
          <IonItem>
            <IonInput  placeholder="Enter Password" onIonChange={e => setTempPassword(e.detail.value!)}></IonInput>
          </IonItem>

          <IonItem>
            <IonInput  placeholder="email" onIonChange={e => setTempEmail(e.detail.value!)}></IonInput>
          </IonItem>


          <IonButton className="ion-margin-top" type="submit" expand="block">
            Sign Up
          </IonButton>
        </form>
  )


  
}

export default SignupForm;