import React from 'react';
import { render, screen } from '@testing-library/react';
import DataListTemplate from '../data-list-template';

describe('DataListTemplate', () => {
    it("should render the 'DataListTemplate' component with correct details", () => {
        const mock_props: React.ComponentProps<typeof DataListTemplate> = {
            data_source: {
                app_id: 99,
                app_markup_percentage: 1,
                last_used: '2021-10-31 06:49:52',
                name: 'NAME',
                official: 0,
                scopes: ['read', 'admin'],
                appstore: null,
                github: null,
                googleplay: null,
                homepage: null,
                redirect_uri: '',
                verification_uri: null,
            },
            handleToggleModal: () => undefined,
        };
        const mock_permissions = mock_props.data_source?.scopes
            ?.map(scope => scope.charAt(0).toUpperCase().concat(scope.substring(1)))
            .join(', ');
        render(<DataListTemplate {...mock_props} />);

        expect(screen.getByText(mock_props.data_source.name)).toBeInTheDocument();
        if (mock_props.data_source?.last_used) {
            expect(screen.getByText(mock_props.data_source?.last_used)).toBeInTheDocument();
        } else {
            expect(mock_props.data_source?.last_used).not.toBeNull();
        }
        if (mock_permissions) {
            expect(screen.getByText(mock_permissions)).toBeInTheDocument();
        } else {
            expect(mock_permissions).not.toBeNull();
        }
    });
});
