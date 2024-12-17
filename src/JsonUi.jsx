import { Card, CardHeader, CardBody, Divider, Code } from '@nextui-org/react';
import JsonRenderer from './json-renderer/JsonRenderer';

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
        className: 'border border-blue-500 p-2 bg-blue-100'
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
        body: [{
            type: "radio",
            params: {
                label: "请选择数值",
                orientation: "horizontal",
                defaultValue: "3",
            },
            events: {
                onChange: { action: "set", target: "result" }
            },
            body: [{ "value": "1" }, { "value": "2" }, { "value": "3" }],
        },
        {
            body: "选择了${result}",
        }]
    };

    const data5 = {
        result: "3"
    }

    const ui6 = {
        type: "table",
        className: "border-collapse text-xs",
        body: [
            {
                "type": "tr", "className": "bg-blue-100", "body": [
                    { "type": "th", "body": "评级因素", "params": { "scope": "col" }, "className": "border border-slate-800 p-2" },
                    { "type": "th", "body": "指标名称", "params": { "scope": "col" }, "className": "border border-slate-800 p-2" },
                    { "type": "th", "body": "权重", "params": { "scope": "col" }, "className": "border border-slate-800 p-2" },
                    { "type": "th", "body": "二级指标值", "params": { "scope": "col" }, "className": "border border-slate-800 p-2" },
                    { "type": "th", "body": "指标得分", "params": { "scope": "col" }, "className": "border border-slate-800 p-2" },
                ]
            },
            {
                "type": "tr", "body": [
                    { "type": "th", "body": "业务指标", "params": { "scope": "row" }, "className": "border border-slate-800 p-2" },
                    { "type": "td", "body": "产品结构及竞争力", "className": "border border-slate-800 p-2" },
                    { "type": "td", "body": "${weight[0] * 100}%", "className": "border border-slate-800 p-2" },
                    {
                        "type": "td", "body": [{
                            "type": "radio", "params": { "orientation": "horizontal" }, "events": {
                                "onChange": { "action": "set", "target": "result0" }
                            }, "body": [{ "value": "1" }, { "value": "2" }, { "value": "3" }]
                        }, { "type": "textarea", "params": { "label": "请输入调整意见" } }], "className": "border border-slate-800 p-2"
                    },
                    { "type": "td", "body": "${(result0 * weight[0]).toFixed(2)}", "className": "border border-slate-800 p-2" }
                ]
            },
        ]
    }

    const data6 = {
        weight: [0.2],
        result0: 0
    }


    return (
        <div className='w-full flex flex-col gap-2'>
            <Card>
                <CardHeader className='text-lg font-bold'>
                    渲染文本
                </CardHeader>
                <Divider />
                <CardBody className='gap-2'>
                    <p>UI: <Code className='text-wrap'>{JSON.stringify(ui1)}</Code></p>
                    <JsonRenderer json={ui1} />
                </CardBody>
            </Card>

            <Card>
                <CardHeader className='text-lg font-bold'>
                    渲染嵌套对象
                </CardHeader>
                <Divider />
                <CardBody className='gap-2'>
                    <p>UI: <Code className='text-wrap'>{JSON.stringify(ui2)}</Code></p>
                    <JsonRenderer json={ui2} />
                </CardBody>
            </Card>
            <Card>
                <CardHeader className='text-lg font-bold'>
                    渲染嵌套数组
                </CardHeader>
                <Divider />
                <CardBody className='gap-2'>
                    <p>UI: <Code className='text-wrap'>{JSON.stringify(ui3)}</Code></p>
                    <JsonRenderer json={ui3} />
                </CardBody>
            </Card>
            <Card>
                <CardHeader className='text-lg font-bold'>
                    读取数据和计算
                </CardHeader>
                <Divider />
                <CardBody className='gap-2'>
                    <p>UI: <Code className='text-wrap'>{JSON.stringify(ui4)}</Code></p>
                    <p>Data: <Code className='text-wrap'>{JSON.stringify(data4)}</Code></p>
                    <JsonRenderer json={ui4} data={data4} />
                </CardBody>
            </Card>
            <Card>
                <CardHeader className='text-lg font-bold'>
                    渲染单选框组
                </CardHeader>
                <Divider />
                <CardBody className='gap-2'>
                    <p>UI: <Code className='text-wrap'>{JSON.stringify(ui5)}</Code></p>
                    <p>Data: <Code className='text-wrap'>{JSON.stringify(data5)}</Code></p>
                    <JsonRenderer json={ui5} data={data5} />
                </CardBody>
            </Card>
            <Card>
                <CardHeader className='text-lg font-bold'>
                    渲染表格
                </CardHeader>
                <Divider />
                <CardBody className='gap-2'>
                    <p>UI: <Code className='text-wrap'>{JSON.stringify(ui6)}</Code></p>
                    <JsonRenderer json={ui6} data={data6} />
                </CardBody>
            </Card>
        </div>
    )
}