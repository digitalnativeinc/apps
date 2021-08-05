import React, { ComponentType } from 'react';

export function withProps<T, P>(
    WrappedComponent: ComponentType<T>,
    from: P,
    selected: (keyof P)[]
    ) {
    const _selected = selected.reduce((map: Partial<P>, item) => {
        map[item] = from[item];
        return map;
    }, {});
    const ComponentWithProps = (props: T) => {
        return <WrappedComponent {...props} {..._selected}/>
    }
    return ComponentWithProps
}
