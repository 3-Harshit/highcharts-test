import React, { useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Boost from 'highcharts/modules/boost';

Boost(Highcharts);



// The wrapper exports only a default component that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props) and
// RefObject interface (HighchartsReact.RefObject). All other interfaces
// like Options come from the Highcharts module itself.

function getData(n: number, t?: number) {
  var arr = [],
    i,
    a,
    b,
    c,
    spike;
  a = 0;
  b = 0;
  c = 0;
  if(t) c -= 5;
  for (i = 0; i < n; i = i + 1) {
    if (i % 100 === 0) {
      a = 2 * Math.random();
    }
    if (i % 1000 === 0) {
      b = 2 * Math.random();
    }
    if (i % 10000 === 0) {
      c = 2 * Math.random();
  if(t) c -= 5;

    }
    if (i % 50000 === 0) {
      spike = 10;
    } else {
      spike = 0;
    }
    // arr.push({
    //   x: i,
    //   y: 2 * Math.sin(i / 100) + a + b + c + spike + Math.random()
    // } as Highcharts.XrangePointOptionsObject);
    arr.push(2 * Math.sin(i / 100) + a + b + c + spike + Math.random())
  }
  return arr;
}
var n = 500000,
  data = getData(n),
  data2 = getData(n,5);

const options: Highcharts.Options = {
  chart: {
    zooming: {
      type: "xy",
    }
  },
  boost: {
    useGPUTranslations: true
  },

  title: {
    text: 'Highcharts drawing ' + n + ' points'
  },

  subtitle: {
    text: 'Using the Boost module'
  },
  tooltip: {
    valueDecimals: 2
  },
  series: [
    {
      data: data,
      type: "line",
      // lineWidth: 0.5
      events: {
        legendItemClick: function () {
            var visibility = this.visible ? 'visible' : 'hidden';
            if (!window.confirm('The series is currently ' +
                         visibility + '. Do you want to change that?')) {
                return false;
            }
        }
    }
    },{
      data: data2,
      type: "line",
      color: 'red',
      events: {
        legendItemClick: function () {
            var visibility = this.visible ? 'visible' : 'hidden';
            if (!window.confirm('The series is currently ' +
                         visibility + '. Do you want to change that?')) {
                return false;
            }
        }
    }
      // lineWidth: 0.5
    },
    // {
    //   name: 'series0',
    //   data: (function () {
    //     let arr = [];
    //     for (let i = 0; i < n; i++) {
    //       arr.push(Math.random() * 100)
    //     }
    //     return arr
    //   }()),
    //   type: "line",
    //   color: 'red'
    // },
  ],
};

// React supports function components as a simple way to write components that
// only contain a render method without any state (the App component in this
// example).

const App = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
};

export default App
