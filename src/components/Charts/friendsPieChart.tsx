import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
//connecting to state store
import { FriendStore } from '../../store';
import { getFriends } from '../../store/Selectors';
import { useStoreState } from 'pullstate';

Chart.register(...registerables);

const FriendsPieChart: React.FC = () => {

  const friends = useStoreState(FriendStore, getFriends);
  
  const [tempNames, setTempNames] = useState<any>()
  const [tempPoop, setTempPoop] = useState<any>()

  console.log(friends);


  const getNames = (array: any[]) => {
    let namesArray = []
    for (let i = 0; i < array.length; i++) {
      let name = array[i].username || array[i].nickname
      namesArray.push(name)
    }
    return namesArray
  }

  const getPoop = (array: any[]) => {
    let poopArray = []
    for (let i = 0; i < array.length; i++) {
      let poop = array[i].poopInfo
      poopArray.push(poop)
    }
    return poopArray
  }

  useEffect(() => {
    setTempNames(getNames(friends))
    setTempPoop(getPoop(friends))
  }, [friends])

  console.log(tempNames)
  console.log(tempPoop)

  const data = {
    labels: tempNames,
    datasets: [{
      label: 'poop pie',
      data: tempPoop,
      backgroundColor: [
        '#402A2C',
        '#D9B8C4',
        '#957186',
        '#703D57',
        '#003049',

      ],
      hoverOffset: 4
    }]
  };

  return (
    <div>
      <Pie 
        data={data}
        options ={{ 
          maintainAspectRatio: true,
          responsive: true,
        }}
      />
    </div>
  )

}

export default FriendsPieChart;