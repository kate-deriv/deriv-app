import React from 'react';
import { Localize } from '@deriv/translations';
import { Loading } from '@deriv/components';
import { Text } from '@deriv-com/quill-ui';
import { useDevice } from '@deriv-com/ui';
import { getUrlBase } from '@deriv/shared';

type TVideoFragment = {
    contract_type: string;
};
const VideoFragment = ({ contract_type }: TVideoFragment) => {
    const [is_loading, setIsLoading] = React.useState(true);

    const { isMobile } = useDevice();
    // memoize file paths for videos and open the modal only after we get them
    const getVideoSource = React.useCallback(
        (extension: string) => {
            return getUrlBase(
                `/public/videos/${contract_type.toLowerCase()}_manual_${isMobile ? 'mobile' : 'desktop'}.${extension}`
            );
        },
        [contract_type, isMobile]
    );

    const mp4_src = React.useMemo(() => getVideoSource('mp4'), [getVideoSource]);
    const webm_src = React.useMemo(() => getVideoSource('webm'), [getVideoSource]);

    return (
        <div className='video-fragment__wrapper'>
            {is_loading && <Loading is_fullscreen={false} />}
            <video
                autoPlay
                loop
                onLoadedData={() => setIsLoading(false)}
                playsInline
                preload='auto'
                className='video-fragment'
            >
                {/* a browser will select a source with extension it recognizes */}
                <source src={mp4_src} type='video/mp4' />
                <source src={webm_src} type='video/webm' />
                <Text size='sm'>
                    <Localize i18n_default_text='Unfortunately, your browser does not support the video.' />
                </Text>
            </video>
        </div>
    );
};

export default VideoFragment;
