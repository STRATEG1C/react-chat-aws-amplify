import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PageWrapper from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test PageWrapper component', () => {
    it('Should be rendered for unauthorized user', () => {
        const mockedStore = mockStore({ auth: { user: null } });

        const { asFragment, queryByTestId } = render(
            <Provider store={mockedStore}>
                <PageWrapper title="foo">Bar</PageWrapper>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
        expect(queryByTestId('login-btn')).toBeInTheDocument();
    });

    it('Should be rendered for authorized user', () => {
        const mockedStore = mockStore({ auth: { user: { id: '1', username: 'John Doe' } } });

        const { asFragment, queryByTestId } = render(
            <Provider store={mockedStore}>
                <PageWrapper title="foo">Bar</PageWrapper>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
        expect(queryByTestId('logout-btn')).toBeInTheDocument();
    });
});
