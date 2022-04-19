import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
//connecting to state store
import { FriendStore } from "../../store";
import { getFriends } from "../../store/Selectors";
import { useStoreState } from "pullstate";

Chart.register(...registerables);

const FriendsBarChart: React.FC = () => {
  // variables retrieved from global state
  const friends = useStoreState(FriendStore, getFriends);

  const [tempNames, setTempNames] = useState<any>();
  const [tempPoop, setTempPoop] = useState<any>();

  // console.log(userPoopInfo)
  // console.log(friends);

  // functions to get only the data we need for the chart
  const getNames = (array: any[]) => {
    let namesArray = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].poopInfo) {
        let name = array[i].username || array[i].nickname;
        namesArray.push(name);
      }
    }
    return namesArray;
  };

  const getPoop = (array: any[]) => {
    let poopArray = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].poopInfo) {
        let poop = array[i].poopInfo;
        poopArray.push(poop);
      }
    }
    return poopArray;
  };

  useEffect(() => {
    if (friends){
      setTempNames(getNames(friends));
      setTempPoop(getPoop(friends));
    }
  }, [friends]);

  // console.log(tempNames)
  // console.log(tempPoop)

  // setting data for the chart
  const data = {
    labels: tempNames,
    datasets: [
      {
        label: "Total Poop Weight",
        data: tempPoop,
        // you can set indiviual colors for each bar
        backgroundColor: [
          "#402A2C",
          "#D9B8C4",
          "#957186",
          "#703D57",
          "#003049",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Bar
        data={data}
        // height="30%"
        // width="75%"
        options={{
          maintainAspectRatio: true,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "How much your friends poop",
            },
            legend: {
              display: true,
              position: "top",
            },
          },
        }}
      />
    </div>
  );
};

export default FriendsBarChart;
