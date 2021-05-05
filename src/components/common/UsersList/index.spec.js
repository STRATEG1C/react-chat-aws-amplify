import { queryAllByTestId, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersList from './index';

const listFixture = [
    {
        id: 1,
        username: 'Name 1'
    },
    {
        id: 2,
        username: 'Name 2'
    }
];

const currentUserId = 1;

describe('Test UserList component', () => {
    it('should be rendered', () => {
        const onClickStub = jest.fn();
        const { asFragment } = render(
            <UsersList
                items={listFixture}
                onItemClick={onClickStub}
                currentUserId={currentUserId}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('should be rendered without current user', () => {
        const onClickStub = jest.fn();
        const { queryAllByTestId } = render(
            <UsersList
                items={listFixture}
                onItemClick={onClickStub}
                currentUserId={currentUserId}
            />
        );
        expect(queryAllByTestId('user-card').length).toBe(listFixture.length - 1);
    });

    it('should be clickable', () => {
        const onClickStub = jest.fn();
        const { queryByTestId } = render(
            <UsersList
                items={listFixture}
                onItemClick={onClickStub}
                currentUserId={currentUserId}
            />
        );
        userEvent.click(queryByTestId('user-card'));
        expect(onClickStub).toBeCalledTimes(1);
        expect(onClickStub).toBeCalledWith(listFixture[1]);
    });
});
