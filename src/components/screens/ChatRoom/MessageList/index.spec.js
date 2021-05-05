import { fireEvent, render } from '@testing-library/react';
import MessageList from './index';

const listFixture = [
    {
        id: '1',
        content: 'Text 1',
        userID: '1',
        user: {
            id: '1',
            username: 'User 1'
        }
    },
    {
        id: '2',
        content: 'Text 2',
        userID: '2',
        user: {
            id: '2',
            username: 'User 2'
        }
    },
    {
        id: '3',
        content: 'Text 3',
        userID: '3',
        user: {
            id: '3',
            username: 'User 3'
        }
    },
]

describe('Test MessageList component', () => {
    it('should be rendered', () => {
        const { asFragment, queryAllByRole } = render(<MessageList messages={listFixture} />);
        expect(asFragment()).toMatchSnapshot();
        expect(queryAllByRole('chat-message').length).toBe(listFixture.length);
    });
});
