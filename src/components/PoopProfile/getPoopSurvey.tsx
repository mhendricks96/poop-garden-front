import {
  IonIcon,
  IonList,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonItem,
  IonListHeader,
  IonInput,
  IonRange,
  IonSlides,
  IonSlide,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import { thumbsDown, thumbsUp } from "ionicons/icons";
import { differenceInDays } from "date-fns";

import React, { useEffect, useRef, useState } from "react";
import useResourcePoop from "../../hooks/useResourcePoop";
import { useAuth } from "../../contexts/auth.js";
import "./getPoopSurvey.scss";

const slideOpts = {
  initialSlide: 0,
  speed: 400,
};

interface PoopProfileProps {
  setShowPoopSurvey: any;
}

const PoopSurvey: React.FC<PoopProfileProps> = ({ setShowPoopSurvey }: PoopProfileProps) => {
  const { user } = useAuth();
  const { createResourcePoop } = useResourcePoop();

  const [q1selected, setq1Selected] = useState<string>("avg");
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [fiberValue, setFiberValue] = useState<any>(5);

  const router = useIonRouter();


  const getTotalPoop = (info: any) => {
    /// function that will use the 3 states above (mostly the birthday) and turn it into a single poop number that i can send to the back
    let current = new Date();
    let bornDate = new Date(info.selectedDate);
    let totalDays = differenceInDays(current, bornDate);
    let totalOunces = totalDays * 14;
    let totalPounds = Math.round(totalOunces / 16);
    return totalPounds;
  };

  async function sendDataToServer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let formInfo = {
      baby: q1selected,
      selectedDate: selectedDate,
      fiber: fiberValue,
    };
    let poopInfo = await getTotalPoop(formInfo);

    let postInfo = {
      user: user.id,
      nickname: user.username,
      poopInfo: poopInfo,
    };
    let newPoopProfile = await createResourcePoop(postInfo);

    setShowPoopSurvey(false);
    router.push("/tab3")
    console.log(newPoopProfile);
  }

  const mySlides = useRef<any>(null);

  useEffect(() => {
    mySlides.current.lockSwipes(true);
  });

  const next = async () => {
    await mySlides.current.lockSwipes(false);
    await mySlides.current.slideNext();
    await mySlides.current.lockSwipes(true);
  };

  const previous = async () => {
    await mySlides.current.lockSwipes(false);
    await mySlides.current.slidePrev();
    await mySlides.current.lockSwipes(true);
  };

  return (
    <form onSubmit={(e) => sendDataToServer(e)}>
      <IonSlides pager={true} options={slideOpts} ref={mySlides}>
        <IonSlide>
          <div className="slide-main">
            <div className="form-content">
              <IonList>
                <IonRadioGroup
                  value={q1selected}
                  onIonChange={(e) => setq1Selected(e.detail.value)}
                  // {...register("baby", { required: true })}
                >
                  <h3 className="ion-text-center">As a lil shitter(baby)</h3>
                  <IonListHeader>
                    <IonLabel>
                      Have you heard rumor of you pooping habits?
                    </IonLabel>
                  </IonListHeader>

                  <IonItem>
                    <IonLabel>I never pooped as a baby</IonLabel>
                    <IonRadio slot="start" value="small" />
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      I was a baby, I pooped. Not much to tell
                    </IonLabel>
                    <IonRadio slot="start" value="avg" />
                  </IonItem>

                  <IonItem>
                    <IonLabel>Oh, my baby poops were legendary</IonLabel>
                    <IonRadio slot="start" value="large" />
                  </IonItem>

                  <IonItem>
                    <IonLabel>Such things were not told to me</IonLabel>
                    <IonRadio slot="start" value="idk" />
                  </IonItem>
                </IonRadioGroup>
              </IonList>
            </div>
            <div className="form-footer">
              <IonButton onClick={() => next()}>Next</IonButton>
            </div>
          </div>
        </IonSlide>
        <IonSlide>
          <div className="slide-main">
            <h3 className="ion-text-center">Birthday</h3>
            <div className="form-content">
              <p>don't worry, no one is gonna check</p>
              <IonItem>
                <IonInput
                placeholder="Birthday"
                  type="date"
                  required={true}
                  value={selectedDate}
                  onIonChange={(e) => setSelectedDate(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </div>
            <div className="form-footer">
              <IonButton onClick={() => previous()}>Prev</IonButton>
              <IonButton onClick={() => next()}>Next</IonButton>
            </div>
          </div>
        </IonSlide>
        <IonSlide>
          <div className="slide-main">
            <h3 className="ion-text-center">How do you feel about fiber?</h3>
            <div className="form-content">
              <IonItem>
                <IonRange
                  min={1}
                  max={10}
                  step={1}
                  value={fiberValue}
                  onIonChange={(e) => setFiberValue(e.detail.value!)}
                >
                  <IonIcon size="small" slot="start" icon={thumbsDown} />
                  <IonIcon slot="end" icon={thumbsUp} />
                </IonRange>
              </IonItem>
            </div>
            <div className="form-footer">
              <IonButton onClick={() => previous()}>Prev</IonButton>
              <IonButton type="submit">Submit</IonButton>
            </div>
          </div>
        </IonSlide>
      </IonSlides>
    </form>
  );
};

export default PoopSurvey;
