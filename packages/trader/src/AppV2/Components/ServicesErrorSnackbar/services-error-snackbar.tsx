import React from 'react';
import { localize } from '@deriv/translations';
import { useLocation } from 'react-router-dom';
import { observer, useStore } from '@deriv/stores';
import { useTraderStore } from 'Stores/useTraderStores';
import { useSnackbar, SnackbarController } from '@deriv-com/quill-ui';
import { getStaticUrl, isEmptyObject, isValidToCancel, routes } from '@deriv/shared';
import useContractDetails from 'AppV2/Hooks/useContractDetails';
import { checkIsServiceModalError, SERVICE_ERROR } from 'AppV2/Utils/layout-utils';

const ServicesErrorSnackbar = observer(() => {
    const {
        common: { services_error, resetServicesError },
        ui: { is_mf_verification_pending_modal_visible },
        client: { is_logged_in },
    } = useStore();
    const { is_multiplier } = useTraderStore();
    const { contract_info } = useContractDetails();
    const { addSnackbar } = useSnackbar();
    const { pathname } = useLocation();

    const { code, message } = services_error || {};
    const has_services_error = !isEmptyObject(services_error);
    const is_modal_error = checkIsServiceModalError({ services_error, is_mf_verification_pending_modal_visible });

    const checkShouldShowErrorSnackBar = () => {
        if (!has_services_error) return false;
        if (pathname === routes.trade) return has_services_error && !is_modal_error;
        if (pathname === routes.trader_positions || location.pathname.startsWith('/contract/'))
            return has_services_error;
        return false;
    };

    const should_show_error_snackbar = checkShouldShowErrorSnackBar();
    const should_contain_action = should_show_error_snackbar && code === SERVICE_ERROR.COMPANY_WIDE_LIMIT_EXCEEDED;
    const bottom_position =
        location.pathname.startsWith('/contract/') && is_multiplier && isValidToCancel(contract_info)
            ? '104px'
            : '48px';
    const action_props = {
        actionText: localize('View'),
        delay: 8000,
        onActionClick: () => window.open(getStaticUrl('tnc/trading-terms.pdf', true)),
    };

    React.useEffect(() => {
        if (should_show_error_snackbar) {
            addSnackbar({
                message,
                status: 'fail',
                hasCloseButton: true,
                hasFixedHeight: false,
                onSnackbarRemove: resetServicesError,
                style: {
                    marginBottom: is_logged_in ? bottom_position : '-8px',
                    width: 'calc(100% - var(--core-spacing-800)',
                },
                ...(should_contain_action ? { action_props } : {}),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [should_show_error_snackbar]);

    return <SnackbarController />;
});

export default ServicesErrorSnackbar;
