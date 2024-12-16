import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import AntdJsonRenderer from './antd-json-renderer/AntdJsonRenderer';

export default function JsonUi() {

    const ui1 = {
        body: "Hello World",
        className: 'text-purple-700'
    }

    const ui2 = {
        body: {
            body: "Hello World",
            className: 'text-blue-500'
        },
        className: 'border border-red-500 h-10 w-20'
    }

    const ui3 = {
        body: [{
            body: "Hello World",
            className: 'text-red-500'
        },
        {
            body: "Another text",
            className: 'text-green-500'
        }],
        className: 'border border-blue-500 p-2'
    }

    const ui4 = {
        body: "计算结果：${100 + v1 * dataInObject.v2 + dataInArray[0].v3}",
        className: 'font-bold underline'
    }

    const data4 = {
        "v1": 100,
        "dataInObject": {
            "v2": 2
        },
        "dataInArray": [{
            "v3": 100
        }]
    }

    const ui5 = {
        body: [{ "value": "1" }, { "value": "2" }, { "value": "3" }],
        params: {
            label: "请选择数值",
            orientation: "horizontal",
            defaultValue: "3",
        },
        type: "radio",
    }

    return (
        <div className='w-full flex flex-col gap-2'>
            <Card>
                <CardHeader className='text-lg font-bold'>
                    渲染文本
                </CardHeader>
                <Divider />
                <CardBody className='gap-2'>
                    <p>UI: {JSON.stringify(ui1)}</p>
                    <AntdJsonRenderer json={ui1} />
                </CardBody>
            </Card>

            <Card>
                <CardHeader className='text-lg font-bold'>
                    渲染嵌套对象
                </CardHeader>
                <Divider />
                <CardBody className='gap-2'>
                    <p>UI: {JSON.stringify(ui2)}</p>
                    <AntdJsonRenderer json={ui2} />
                </CardBody>
            </Card>
            <Card>
                <CardHeader className='text-lg font-bold'>
                    渲染嵌套数组
                </CardHeader>
                <Divider />
                <CardBody className='gap-2'>
                    <p>UI: {JSON.stringify(ui3)}</p>
                    <AntdJsonRenderer json={ui3} />
                </CardBody>
            </Card>
            <Card>
                <CardHeader className='text-lg font-bold'>
                    读取数据和计算
                </CardHeader>
                <Divider />
                <CardBody className='gap-2'>
                    <p>UI: {JSON.stringify(ui4)}</p>
                    <p>Data: {JSON.stringify(data4)}</p>
                    <AntdJsonRenderer json={ui4} data={data4} />
                </CardBody>
            </Card>

            <Card>
                <CardHeader className='text-lg font-bold'>
                    渲染单选框组
                </CardHeader>
                <Divider />
                <CardBody className='gap-2'>
                    <p>UI: {JSON.stringify(ui5)}</p>
                    <AntdJsonRenderer json={ui5} />
                </CardBody>
            </Card>
        </div>
    )
}