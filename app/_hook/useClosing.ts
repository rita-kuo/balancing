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
    closingProps: T
) => {
    const [closing, setClosing] = useState(false);
    const componentProps = useMemo(() => {
        if (!closing) return openingProps;
        const props = { ...closingProps };
        const keys = Object.keys(props);
        const onAnimationComplete = () => {
            setClosing(false);
            onClose();
        };
        if (keys.includes('initial')) {
            return { ...props, onAnimationComplete };
        }
        keys.forEach(
            (key) =>
                ((
                    props[key as keyof T] as ComponentConfig
                ).onAnimationComplete = onAnimationComplete)
        );
    }, [closing, openingProps, closingProps, onClose]);

    return {
        onClose: () => setClosing(true),
        componentProps,
    };
};
