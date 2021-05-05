import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Router, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import AuthenticatedRoute from './index';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const StubComponent = () => <div data-testid='pageComponent'>Foo</div>;

describe('Test AuthenticatedRoute component', () => {
    it('Should be rendered for authorized user', () => {
        const mockedStore = mockStore({ auth: { user: { id: '1', username: 'John Doe' } } });
        history.push('/');
        const { asFragment, queryByTestId } = render(
            <Provider store={mockedStore}>
                <Router history={history}>
                    <Switch>
                        <AuthenticatedRoute exact path="/" component={StubComponent} />
                    </Switch>
                </Router>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
        expect(queryByTestId('pageComponent')).toBeInTheDocument();
    });

    it('Should not be rendered for unauthorized user', () => {
        const mockedStore = mockStore({ auth: { user: null } });
        history.push('/');
        const { asFragment, queryByTestId } = render(
            <Provider store={mockedStore}>
                <Router history={history}>
                    <Switch>
                        <AuthenticatedRoute exact path="/" component={StubComponent} />
                    </Switch>
                </Router>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
        expect(queryByTestId('pageComponent')).not.toBeInTheDocument();
    });
});
