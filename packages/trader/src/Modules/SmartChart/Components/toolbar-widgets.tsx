import React from 'react';
import { isDesktop, isMobile } from '@deriv/shared';
import { ChartMode, DrawTools, Share, StudyLegend, Views, ToolbarWidget } from 'Modules/SmartChart';

type TToolbarWidgets = {
    updateChartType: (type: string) => void;
    updateGranularity: (granularity: number) => void;
};

const ToolbarWidgets = ({ updateChartType, updateGranularity }: TToolbarWidgets) => {
    return (
        <ToolbarWidget position={isMobile() ? 'bottom' : null}>
            <ChartMode portalNodeId='modal_root' onChartType={updateChartType} onGranularity={updateGranularity} />
            {isDesktop() && <StudyLegend portalNodeId='modal_root' searchInputClassName='data-hj-whitelist' />}
            {isDesktop() && <Views portalNodeId='modal_root' searchInputClassName='data-hj-whitelist' />}
            {isDesktop() && <DrawTools portalNodeId='modal_root' />}
            {isDesktop() && <Share portalNodeId='modal_root' />}
        </ToolbarWidget>
    );
};

export default React.memo(ToolbarWidgets);
