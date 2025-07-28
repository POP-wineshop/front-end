// components/UserListPanel.tsx
import { useState } from 'react';
import UserList from './UserList';
import UserDetail from './UserDetail';
import { UserItemType } from '@/types/backOffice/user/user';
import { Search } from 'lucide-react';

const UserListPanel = () => {
  const [selectedUser, setSelectedUser] = useState<UserItemType | null>(null);

  return (
    <div className="m-auto flex h-[80vh] rounded-xl overflow-hidden shadow-lg border bg-gray-50">
      <div className="w-[500px] border-r bg-white flex flex-col">
        {/* 정렬 옵션바 */}
        <div className="flex justify-center items-center py-4 px-6 border-b bg-gray-50">
          {/* 검색창 */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="찾으시는 유저를 입력해주세요"
              className="pl-8 pr-2 py-1 border rounded w-full"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <UserList onSelect={setSelectedUser} selectedUser={selectedUser} />
        </div>
      </div>
      <div className="w-[700px] flex-1 flex items-start justify-center bg-gray-50 p-8 overflow-y-scroll">
        {selectedUser ? (
          <UserDetail user={selectedUser} />
        ) : (
          <div className="m-auto text-gray-400 text-center flex flex-col items-center">
            <span className="text-4xl mb-2">👤</span>
            <p>유저를 선택하면 상세 정보가 표시됨</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListPanel;
