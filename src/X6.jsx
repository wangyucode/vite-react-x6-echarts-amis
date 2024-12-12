import { useEffect, useRef, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  useDisclosure,
  CardHeader
} from '@nextui-org/react'
import { Graph } from '@antv/x6'


import Edit from './Edit'

export default function X6() {
  const containerRef = useRef(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [data, setData] = useState(null);

  useEffect(() => {
    const graph = new Graph({
      container: containerRef.current,
      background: {
        color: '#F2F7FA',
      },
      grid: true,
      interacting: false,
    });

    graph.on('blank:dblclick', () => {
      onOpen();
    });
    fetch('/api/graph/1')
      .then(res => res.json())
      .then(data => {
        setData(data);
        graph.fromJSON(data);
        graph.centerContent();
      }).catch(err => {
        console.error(err);
      });
  }, [isOpen]);

  return (
    <div className='w-full'>
      <Card>
        <CardHeader>
          <h1 className='text-2xl'>x6绘图</h1>
        </CardHeader>
        <CardBody className='w-full h-96'>
          <div ref={containerRef} className='h-full' />
        </CardBody>
        <Divider />
        <CardFooter className='flex justify-end'>
          <Button color='primary' onPress={onOpen}>编辑</Button>
        </CardFooter>
      </Card>
      <Edit isOpen={isOpen} onOpenChange={onOpenChange} graphData={data} />
    </div>
  )
}
