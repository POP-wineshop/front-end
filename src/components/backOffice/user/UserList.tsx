// components/UserList.tsx
import { useState } from 'react';
import { UserWithOrders } from '@/types/backOffice/user/user';
import UserItem from './UserItem';
import { mockUserList } from '@/constants/backOffice/user/mockUserList';

interface UserListProps {
  onSelect: (user: UserWithOrders) => void;
  selectedUser: UserWithOrders | null;
}

const UserList = ({ onSelect, selectedUser }: UserListProps) => {
  const [userList] = useState<UserWithOrders[]>(mockUserList);

  return (
    <div className="flex flex-col gap-2">
      {userList.map((user) => (
        <div
          key={user.id}
          onClick={() => onSelect(user)}
          className="cursor-pointer"
        >
          <UserItem user={user} selected={selectedUser?.id === user.id} />
        </div>
      ))}
    </div>
  );
};

export default UserList;
