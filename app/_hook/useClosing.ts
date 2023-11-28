import { useMemo, useState } from 'react';
import { Target, Transition, VariantLabels } from 'framer-motion';

type Config = boolean | Target | VariantLabels | undefined;
type ComponentConfig = {
    transition?: Transition;
    initial?: Config;
    animate?: Config;
    onAnimationComplete?: () => void;
};
export const useClosing = <
    T extends Record<string, ComponentConfig> | ComponentConfig
>(
    onClose: () => void,
    openingProps: T,
    customClosingProps?: T
) => {
    const [closing, setClosing] = useState(false);
    const openingKeys = useMemo(
        () => Object.keys(openingProps),
        [openingProps]
    );
    const multiple = useMemo(
        () => !openingKeys.includes('initial'),
        [openingKeys]
    );
    const closingProps = useMemo(() => {
        if (customClosingProps) return customClosingProps;
        if (!multiple)
            return {
                initial: openingProps.animate,
                animate: openingProps.initial,
            };
        const origin = openingProps as Record<string, ComponentConfig>;
        const props = {} as Record<string, ComponentConfig>;
        openingKeys.forEach(
            (key) =>
                (props[key as string] = {
                    initial: origin[key]?.animate,
                    animate: origin[key]?.initial,
                })
        );
    }, [customClosingProps, multiple, openingKeys, openingProps]);

    const componentProps = useMemo(() => {
        if (!closing) return openingProps;
        const props = { ...closingProps };
        const onAnimationComplete = () => {
            setClosing(false);
            onClose();
        };
        if (!multiple) {
            return { ...props, onAnimationComplete };
        }
        openingKeys.forEach(
            (key) =>
                ((
                    props[key as keyof typeof props] as ComponentConfig
                ).onAnimationComplete = onAnimationComplete)
        );
    }, [closing, openingProps, closingProps, onClose, multiple, openingKeys]);

    return {
        onClose: () => setClosing(true),
        componentProps,
    };
};
