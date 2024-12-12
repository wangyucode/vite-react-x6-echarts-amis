import { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableColumn,
  CardHeader,
  RadioGroup,
  Radio
} from '@nextui-org/react'
import EChartsReact from 'echarts-for-react'


export default function Dataset() {
  const [layout, setLayout] = useState('row');
  const [options, setOptions] = useState({});

  const dataset = [
    ["姓名", "语文", "数学", "英语"],
    ["张三", 85, 92, 88],
    ["李四", 78, 86, 73],
    ["王五", 90, 80, 85],
    ["赵六", 82, 75, 90]
  ];


  useEffect(() => {
    const columnCount = dataset[0].length - 1;
    const rowCount = dataset.length - 1;
    const series = layout === 'row' ?
      Array(rowCount).fill({ type: 'bar', seriesLayoutBy: 'row' }) :
      Array(columnCount).fill({ type: 'bar', seriesLayoutBy: 'column' });
    setOptions({
      dataset: {
        source: dataset
      },
      tooltip: {},
      xAxis: { type: 'category' },
      yAxis: {},
      legend: {},
      series,
    });
  }, [layout]);

  // function onTypeChange(key, type) {
  //   setTypes(prev => ({ ...prev, [key]: type }));
  // }

  // function onEnableChange(key, enabled) {
  //   setDisabled(prev => ({ ...prev, [key]: !enabled }));
  // }

  function onLayoutChange(v) {
    setLayout(v);
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <h1 className='text-2xl'>ECharts数据集</h1>
      </CardHeader>
      <CardBody className='w-full h-86 flex-row'>
        <EChartsReact option={options} notMerge={true}
          className='flex-1'
        />
        <div className='flex-1 flex flex-col p-2 gap-2'>
          <Table aria-label="成绩表" className='flex-1'>
            <TableHeader>
              {dataset[0].map(v => <TableColumn key={v}>{v}</TableColumn>)}
            </TableHeader>
            <TableBody>
              {dataset.slice(1).map(row => (
                <TableRow key={row[0]}>
                  {row.map(v => <TableCell key={v}>{v}</TableCell>)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <RadioGroup label="行列转换" orientation="horizontal" defaultValue='row' onValueChange={onLayoutChange}>
            <Radio value="row">行</Radio>
            <Radio value="column">列</Radio>
          </RadioGroup>
        </div>

      </CardBody>
    </Card>
  )
}
