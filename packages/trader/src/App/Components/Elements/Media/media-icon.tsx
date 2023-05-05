import React from 'react';

type TMediaIcon = {
    disabled: React.FC<React.SVGAttributes<SVGElement>>;
    enabled: React.FC<React.SVGAttributes<SVGElement>>;
    id: string;
    is_enabled: boolean;
};
const MediaIcon = ({ id, is_enabled, enabled, disabled }: TMediaIcon) => {
    const Icon = is_enabled ? enabled : disabled;
    return <Icon id={id} className='media__icon' />;
};

export { MediaIcon };
