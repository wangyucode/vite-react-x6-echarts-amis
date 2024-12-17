import { useContext } from 'react';
import { RadioGroup, Radio } from "@nextui-org/radio";

import { DataContext } from "../JsonRenderer";

export default function JsonRadio({ json }) {

    const dataContext = useContext(DataContext);
    const { body, className, params, events } = json;

    function handleValueChange(v) {
        if (events.onChange) {
            const { action, target } = events.onChange;
            if (action === "set") {
                dataContext.setInternalData({ ...dataContext.internalData, [target]: v });
            }
        }
    }

    return (
        <RadioGroup {...params} className={className} onValueChange={handleValueChange}>
            {body.map((item) => <Radio key={item.value} value={item.value}>{item.label || item.value}</Radio>)}
        </RadioGroup>
    )
}