import React from 'react';
import { Button, CaptionText, IconButton } from '@deriv-com/quill-ui';
import { LabelPairedXmarkSmBoldIcon } from '@deriv/quill-icons';
import { Localize } from '@deriv/translations';
import { TooltipRenderProps } from 'react-joyride';

const GuideTooltip = ({ isLastStep, primaryProps, skipProps, step, tooltipProps }: TooltipRenderProps) => (
    <div {...tooltipProps} className='guide-tooltip__wrapper'>
        <div>
            {step.title && (
                <div className='guide-tooltip__header'>
                    <CaptionText bold color='var(--component-textIcon-inverse-prominent)'>
                        {step.title}
                    </CaptionText>
                    <IconButton
                        {...skipProps}
                        icon={<LabelPairedXmarkSmBoldIcon fill='var(--component-textIcon-inverse-prominent)' />}
                        className='guide-tooltip__close'
                        size='sm'
                        color='white-black'
                        variant='tertiary'
                    />
                </div>
            )}
            {step.content && (
                <CaptionText color='var(--component-textIcon-inverse-prominent)' className='guide-tooltip__content'>
                    {step.content}
                </CaptionText>
            )}
        </div>
        <Button
            {...primaryProps}
            color='white-black'
            className='guide-tooltip__button'
            variant='secondary'
            size='sm'
            label={isLastStep ? <Localize i18n_default_text='Done' /> : <Localize i18n_default_text='Next' />}
        />
    </div>
);

export default GuideTooltip;
