import React from 'react';
import { StandaloneChevronDownRegularIcon } from '@deriv/quill-icons';
import './chip.scss';
import clsx from 'clsx';
import { CaptionText, Text } from '@deriv-com/quill-ui';
import { TRegularSizes } from '@deriv-com/quill-ui/dist/types';

export const LabelTextSizes: Record<TRegularSizes, JSX.Element> = {
    sm: <CaptionText />,
    md: <Text />,
    lg: <Text />,
};

type BaseChipProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'label'> & {
    label?: React.ReactNode;
    disabled?: boolean;
    isDropdownOpen?: boolean;
    dropdown?: boolean;
    selected?: boolean;
    size?: TRegularSizes;
    // onChipSelect?: (event: React.MouseEvent<HTMLButtonElement>, value: boolean) => void;
    onClick?: () => void;
};

const Chip = React.forwardRef<HTMLButtonElement, BaseChipProps>(
    (
        {
            size = 'md',
            label,
            dropdown = false,
            className,
            selected,
            isDropdownOpen = false,
            // onChipSelect,
            onClick,
            ...rest
        },
        ref
    ) => {
        // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        //     if (dropdown) return;
        //     if (selected === undefined) {
        //         const target = event.currentTarget;
        //         const isSelected = target.getAttribute('data-state') === 'selected';
        //         const selected_state = isSelected ? '' : 'selected';
        //         target.setAttribute('data-state', selected_state);

        //         onChipSelect?.(event, !isSelected);
        //     } else {
        //         onChipSelect?.(event, selected);
        //     }
        // };

        return (
            <button
                onClick={onClick}
                className={clsx(
                    'quill-chip',
                    `quill-chip__size--${size}`,
                    dropdown && `quill-chip__custom-right-padding__size--${size}`,
                    className
                )}
                data-state={selected ? 'selected' : ''}
                ref={ref}
                {...rest}
            >
                {label &&
                    React.cloneElement(LabelTextSizes[size], {
                        children: label,
                    })}
                {dropdown && (
                    <StandaloneChevronDownRegularIcon
                        width={24}
                        height={24}
                        data-state={isDropdownOpen ? 'open' : 'close'}
                        className='rotate'
                    />
                )}
            </button>
        );
    }
);

Chip.displayName = 'Chip';
export default Chip;
