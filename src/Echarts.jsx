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
  Checkbox,
  Select,
  SelectItem,
  CardHeader
} from '@nextui-org/react'
import EChartsReact from 'echarts-for-react'

import stockData from './stock-data';

export default function Echarts() {
  const [options, setOptions] = useState({});
  const [types, setTypes] = useState({});
  const [disabled, setDisabled] = useState({});


  useEffect(() => {
    const series = [];
    const x = [];
    Object.keys(stockData).forEach(key => {
      if (!disabled[key]) {
        series.push({
          name: key,
          type: types[key] || 'line',
          data: Object.values(stockData[key]),
        });
      }
    });
    Object.keys(stockData.纳斯达克指数).forEach(key => {
      x.push(key);
    });
    console.log(series)
    setOptions({
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: x },
      yAxis: {},
      legend: {},
      series
    });
  }, [types, disabled]);

  function onTypeChange(key, type) {
    setTypes(prev => ({ ...prev, [key]: type }));
  }

  function onEnableChange(key, enabled) {
    setDisabled(prev => ({ ...prev, [key]: !enabled }));
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <h1 className='text-2xl'>ECharts图表</h1>
      </CardHeader>
      <CardBody className='w-full h-72 flex-row'>
        <EChartsReact option={options} notMerge={true}
          className='flex-1'
        />
        <Table aria-label="近10年股票走势" className='flex-1'>
          <TableHeader>
            <TableColumn>数据名称</TableColumn>
            <TableColumn>图表类型</TableColumn>
            <TableColumn>是否启用</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>上证指数</TableCell>
              <TableCell>
                <Select defaultSelectedKeys={['line']} onSelectionChange={keys => onTypeChange("上证指数", keys.currentKey)} aria-label='图表类型'>
                  <SelectItem key="line">折线图</SelectItem>
                  <SelectItem key="bar">柱状图</SelectItem>
                </Select>
              </TableCell>
              <TableCell><Checkbox defaultSelected onValueChange={(v) => onEnableChange("上证指数", v)}></Checkbox></TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>日经指数</TableCell>
              <TableCell>
                <Select defaultSelectedKeys={['line']} onSelectionChange={keys => onTypeChange("日经指数", keys.currentKey)} aria-label='图表类型'>
                  <SelectItem key="line">折线图</SelectItem>
                  <SelectItem key="bar">柱状图</SelectItem>
                </Select>
              </TableCell>
              <TableCell><Checkbox defaultSelected onValueChange={(v) => onEnableChange("日经指数", v)}></Checkbox></TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>纳斯达克指数</TableCell>
              <TableCell>
                <Select defaultSelectedKeys={['line']} onSelectionChange={keys => onTypeChange("纳斯达克指数", keys.currentKey)} aria-label='图表类型'>
                  <SelectItem key="line">折线图</SelectItem>
                  <SelectItem key="bar">柱状图</SelectItem>
                </Select>
              </TableCell>
              <TableCell><Checkbox defaultSelected onValueChange={(v) => onEnableChange("纳斯达克指数", v)}></Checkbox></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  )
}
