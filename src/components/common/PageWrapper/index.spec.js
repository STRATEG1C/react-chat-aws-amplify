import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PageWrapper from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test PageWrapper component', () => {
    it('Should be rendered', () => {
        const { asFragment } = render(<PageWrapper title="foo">Bar</PageWrapper>);
        expect(asFragment()).toMatchSnapshot();
    });
});
