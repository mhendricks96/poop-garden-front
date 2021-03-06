import useResourceRequests from "../../hooks/useResourceRequests";
import { IonList, IonItem, IonLabel, IonButton, IonText } from "@ionic/react";

const PendingRequests: React.FC = () => {
  const { resourcesRequests, acceptRequest, declineRequest } =
    useResourceRequests();

  const handleAccept = async (request: any) => {
    let accepted = await acceptRequest({
      id: request.id,
    });
    let newFriend = request.from_user;

    console.log(accepted);
    console.log(newFriend);
  };

  const handleDecline = async (request: any) => {
    let declined = await declineRequest({
      id: request.id,
    });

    console.log(declined);
  };

  return (
    <>
      {resourcesRequests && resourcesRequests.length > 0 ? (
        <IonList>
          {resourcesRequests.map(
            (request: any, index: React.Key | null | undefined) => {
              return (
                <IonItem key={index}>
                  <IonLabel>
                    <IonText>
                      <p>{request.from_user} would like to be your friend!</p>
                    </IonText>
                  </IonLabel>
                  <IonButton
                    fill="outline"
                    slot="end"
                    color="tertiary"
                    onClick={() => handleAccept(request)}
                  >
                    accept
                  </IonButton>
                  <IonButton
                    fill="outline"
                    slot="end"
                    color="medium"
                    onClick={() => handleDecline(request)}
                  >
                    decline
                  </IonButton>
                </IonItem>
              );
            }
          )}
        </IonList>
      ) : (
        <p className="ion-text-center">You have no pending requests</p>
      )}
    </>
  );
};

export default PendingRequests;
