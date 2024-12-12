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
  Radio,
  Button,
  Select,
  SelectItem
} from '@nextui-org/react'
import EChartsReact from 'echarts-for-react'


export default function GDP() {
  const [options, setOptions] = useState({});
  const [fields, setFields] = useState([]);

  const data = [
    { "japan": 5.21, "america": 16.7, "china": 9.57, "year": 2013 },
    { "japan": 4.93, "america": 17.35, "china": 10.48, "year": 2014 },
    { "japan": 4.44, "america": 17.97, "china": 11.06, "year": 2015 },
    { "japan": 4.9, "america": 18.57, "china": 11.23, "year": 2016 },
    { "japan": 4.93, "america": 19.39, "china": 12.31, "year": 2017 },
    { "japan": 4.98, "america": 20.58, "china": 13.46, "year": 2018 },
    { "japan": 5.12, "america": 21.43, "china": 14.14, "year": 2019 },
    { "japan": 5.06, "america": 20.94, "china": 14.72, "year": 2020 },
    { "japan": 5.03, "america": 23.32, "china": 17.73, "year": 2021 },
    { "japan": 4.26, "america": 25.47, "china": 18, "year": 2022 },
    { "japan": 4.21, "america": 27.36, "china": 17.9, "year": 2023 }
  ];


  useEffect(() => {
    setOptions({
      tooltip: {},
      xAxis: { type: 'category', data: data.map(d => d.year) },
      yAxis: { name: '万亿美元' },
      legend: {},
      series: fields.map(field => ({
        type: field.type,
        data: data.map(d => d[field.key]),
        name: field.key
      }))
    });
  }, [fields]);

  function addField() {
    setFields([...fields, { type: 'line' }]);
  }

  function removeField(v) {
    const index = Number(v.target.dataset.index);
    setFields(fields.filter((_, i) => i !== index));
  }

  function onTypeChange(key, index) {
    const newFields = [...fields];
    newFields[index].type = key;
    setFields(newFields);
  }

  function onFieldChange(key, index) {
    const newFields = [...fields];
    newFields[index].key = key;
    setFields(newFields);
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <h1 className='text-2xl'>GDP</h1>
      </CardHeader>
      <CardBody className='w-full h-86 flex-row'>
        <EChartsReact option={options} notMerge={true}
          className='flex-1'
        />
        <div className='flex-1 flex flex-col p-2 gap-2'>
          <Button color='primary' onPress={addField}>添加字段</Button>
          {fields.map((field, index) =>
            <div className='flex gap-2' key={index}>
              <Select label='字段' size='sm' selectedKeys={[field.key]} onSelectionChange={keys => onFieldChange(keys.currentKey, index)}>
                {
                  Object.keys(data[0])
                    .filter(key => key !== "year")
                    .map(key =>
                      <SelectItem key={key}>{key}</SelectItem>
                    )
                }
              </Select>
              <Select label='类型' size='sm' selectedKeys={[field.type]} onSelectionChange={keys => onTypeChange(keys.currentKey, index)}>
                <SelectItem key='line'>折线图</SelectItem>
                <SelectItem key='bar'>柱状图</SelectItem>
              </Select>
              <Button color='danger' size='lg' onPress={removeField} data-index={index}>删除</Button>
            </div>)}

        </div>

      </CardBody>
    </Card >
  )
}
