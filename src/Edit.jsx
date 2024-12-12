import { Modal, ModalContent, ModalFooter, Button, ModalBody, ModalHeader, Card, CardBody, Input } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { Graph } from "@antv/x6";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Dnd } from "@antv/x6-plugin-dnd";
import { Selection } from "@antv/x6-plugin-selection";
import { Transform } from "@antv/x6-plugin-transform";


export default function Edit({ isOpen, onOpenChange, graphData }) {
    const containerRef = useRef(null);
    const dndRef = useRef(null);
    const dragRef = useRef(null);
    const [selectedNode, setSelectedNode] = useState(null);

    let dnd = null;
    let graph = null;

    useEffect(() => {
        if (!containerRef.current) return
        graph = new Graph({
            container: containerRef.current,
            grid: true,
            panning: true,
            // resizing: true,
        });
        graph.use(
            new Snapline({
                enabled: true,
            }),
        );

        graph.use(
            new Selection({
                enabled: true,
            }),
        );
        graph.use(
            new Transform({
                resizing: true,
            }),
        );
        dnd = new Dnd({ target: graph, dndContainer: dndRef.current, scaled: false, dragContainer: dragRef.current });
        if (graphData) {
            graph.fromJSON(graphData);
        }
        graph.centerContent();

        graph.on('node:click', ({ node }) => {
            console.log(node)
            setSelectedNode(node)
        })

        graph.on('blank:click', () => {
            setSelectedNode(null)
        })

    }, [isOpen, graphData])

    function startDrag(e) {
        console.log(e.target.dataset.type)
        if (!dnd || !graph) return;
        const type = e.target.dataset.type;
        let node;
        if (type === 'rect') {
            node = graph.createNode({
                shape: 'rect',
                label: '文字',
                height: 60,
                width: 80,
                magnet: true,
                attrs: {
                    body: {
                        stroke: '#0891b2',
                        strokeWidth: 1,
                    }
                },
                ports: {
                    groups: {
                        left: { position: 'left', attrs: { circle: { r: 5, magnet: true, stroke: '#0891b2' } } },
                        right: { position: 'right', attrs: { circle: { r: 5, magnet: true, stroke: '#0891b2' } } },
                        top: { position: 'top', attrs: { circle: { r: 5, magnet: true, stroke: '#0891b2' } } },
                        bottom: { position: 'bottom', attrs: { circle: { r: 5, magnet: true, stroke: '#0891b2' } } },
                    },
                    items: [
                        { id: 'port_top', group: 'top' },
                        { id: 'port_bottom', group: 'bottom' },
                        { id: 'port_left', group: 'left' },
                        { id: 'port_right', group: 'right' },
                    ]
                }
            })
        }

        if (node) {
            dnd.start(node, e.nativeEvent);
        }
    }

    function save() {
        console.log(graph.toJSON())
        fetch('/api/graph/1', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(graph.toJSON()),
        }).then(res => {
            onOpenChange(false);
            console.log(res)
        }).catch(err => {
            console.error(err)
        });
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
            <ModalContent>
                <ModalHeader>
                    编辑
                </ModalHeader>
                <ModalBody>
                    <div className="flex h-full" ref={dragRef}>
                        <div className="w-32 flex flex-col p-8 gap-8 border items-center user-select-none" ref={dndRef}>
                            <div className="border border-slate-800 h-12 w-16 cursor-move flex items-center justify-center" onMouseDown={startDrag} data-type="rect">文字</div>
                        </div>
                        <div className='h-full bg-slate-100 flex-1 relative' >
                            <div ref={containerRef} className="absolute top-0 right-0 w-full h-full" />
                            {selectedNode && <Card className="absolute top-4 right-4 w-32 h-64">
                                <CardBody className="flex flex-col gap-4">
                                    <Input label="文本内容" defaultValue={selectedNode.attrs.text.text} onValueChange={(v) => {
                                        console.log(v)
                                        selectedNode.updateAttrs({
                                            ...selectedNode.attrs,
                                            text: {
                                                ...selectedNode.attrs.text,
                                                text: v
                                            }
                                        })
                                    }}></Input>
                                    <Input type="color" label="字体颜色" defaultValue={selectedNode.attrs.text.fill} onValueChange={(v) => {
                                        selectedNode.updateAttrs({
                                            ...selectedNode.attrs,
                                            text: {
                                                ...selectedNode.attrs.text,
                                                fill: v
                                            }
                                        })
                                    }}></Input>
                                </CardBody>
                            </Card>}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onPress={save}>保存</Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    )
}
