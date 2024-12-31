
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const chartSetting = {
  borderRadius:50,
  height:300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};


const valueFormatter = (value) => `$${value}`;
export default function BarsChart({sales, invest}){
   
    let dataset = [
        {
          invest: 59,
          sale: 57,
          month: 'Jan',
        },
        {
          invest: 50,
          sale: 52,
          month: 'Feb',
        },
        {
          invest: 47,
          sale: 53,
          month: 'Mar',
        },
        {
            invest: 59,
            sale: 57,
            month: 'Apr',
          },
          {
            invest: 50,
            sale: 52,
            month: 'May',
          },
          {
            invest: 0,
            sale: 0,
            month: 'Jun',
          },
          {
            invest: 0,
            sale: 0,
            month: 'Jul',
          },
          {
            invest: 0,
            sale: 0,
            month: 'Aug',
          },
          {
            invest: 0,
            sale: 0,
            month: 'Sep',
          },
          {
            invest: 0,
            sale: 0,
            month: 'Oct',
          },
          {
            invest: 0,
            sale: 0,
            month: 'Nov',
          },
          {
            invest: 0,
            sale: 0,
            month: 'Dec',
          }
      ];

   dataset.map((item,i)=>{
        item.invest = invest[i].amount
        item.sale = sales[i].amount
   }) 
   
    return(
        <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'sale', label: 'Sales', valueFormatter, color:'#F5DAD2' },
        { dataKey: 'invest', label: 'Investements', valueFormatter,color:'#CAB4AD' },
      ]}
      {...chartSetting}
    />
    )
}