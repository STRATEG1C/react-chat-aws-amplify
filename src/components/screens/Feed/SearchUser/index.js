import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../common/TextInput';
import UserService from '../../../../services/UserService';
import UserProvider from '../../../../providers/UserProvider';
import UsersList from '../../../common/UsersList';

const userService = new UserService(new UserProvider());

const SearchUser = ({ value, onChange, onSelectUser }) => {
  const [searchString, setSearchString] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (value === '') {
      setSearchString('');
    }
  }, [value]);

  useEffect(() => {
    if (searchString.length < 3) {
      return;
    }

    userService.searchUser(searchString.toLowerCase())
      .then(users => {
        setUserList(users.items);
      });
  }, [searchString]);

  const onSearch = (field, value) => {
    if (field === 'search') {
      setSearchString(value);
    }

    onChange && onChange(value);
  };

  const onSelectUserHandler = (user) => {
    onSelectUser && onSelectUser(user);
    setSearchString('');
    setUserList([]);
  }

  return (
    <div>
      <TextInput
        type="text"
        placeholder="Search chat or user"
        value={searchString}
        onChange={onSearch}
        label="Search"
        name="search"
        className="search-user"
      />
      {!!userList.length && (
        <UsersList
          items={userList}
          onItemClick={onSelectUserHandler}
          className="feed__chat-list"
        />
      )}
    </div>
  )
};

SearchUser.propTypes = {
  onSelectUser: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SearchUser;
