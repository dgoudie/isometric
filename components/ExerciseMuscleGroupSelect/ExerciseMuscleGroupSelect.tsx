import React, { useMemo, useState } from 'react';

import { ExerciseMuscleGroups } from '../../mongoose/exercise/interface';
import capitalize from '../../utils/capitalize';

type Props = {
    className?: string;
};

export default function ExerciseMuscleGroupSelect({ className }: Props) {
    // const options = useMemo(
    //     () =>
    //         ExerciseMuscleGroups.map((group) => (
    //             <Select.Option key={group} value={group}>
    //                 {capitalize(group)}
    //             </Select.Option>
    //         )),
    //     []
    // );

    // function handleChange(value: any) {
    //     console.log(`selected ${value}`);
    // }

    // return (
    //     <Select
    //         mode='multiple'
    //         allowClear
    //         style={{ width: '100%' }}
    //         placeholder='Filter'
    //         onChange={handleChange}
    //     >
    //         {options}
    //     </Select>
    // );
    return <div></div>;
}
