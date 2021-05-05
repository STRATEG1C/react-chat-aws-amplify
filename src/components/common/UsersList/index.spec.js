import { render } from '@testing-library/react';
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
        const { queryAllByRole } = render(
            <UsersList 
                items={listFixture}
                onItemClick={onClickStub}
                currentUserId={currentUserId}
            />
        );
        expect(queryAllByRole('user-card').length).toBe(listFixture.length - 1);
    });

    it('should be clickable', () => {
        const onClickStub = jest.fn();
        const { queryByRole } = render(
            <UsersList 
                items={listFixture}
                onItemClick={onClickStub}
                currentUserId={currentUserId}
            />
        );
        userEvent.click(queryByRole('user-card'));
        expect(onClickStub).toBeCalledTimes(1);
        expect(onClickStub).toBeCalledWith(listFixture[1].id);
    });
});
