// 백오피스 스타일 Sidebar 개선 버전
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, ClipboardList } from 'lucide-react'; // 아이콘

const menu = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/backoffice/dashboard',
  },
  {
    label: 'Product',
    icon: <Package size={20} />,
    children: [
      {
        label: 'Product List',
        path: '/backoffice/product/list',
      },
      {
        label: 'Product Register',
        path: '/backoffice/product/register',
      },
    ],
  },
  {
    label: 'User',
    icon: <Users size={20} />,
    children: [
      {
        label: 'User List',
        path: '/backoffice/user/list',
      },
    ],
  },
  {
    label: 'Order',
    icon: <ClipboardList size={20} />,
    children: [
      {
        label: 'Order List',
        path: '/backoffice/order/list',
      },
    ],
  },
];

const BackOfficeSidebar = () => {
  const location = useLocation();

  return (
    <aside className="h-screen w-72 bg-[#18181b] text-white shadow-xl flex flex-col py-6 px-4 gap-2">
      {/* 로고 or 타이틀 */}
      <div className="mb-8 text-xl font-extrabold tracking-tight px-2">
        Winehalle Backoffice
      </div>
      {/* 메뉴 */}
      <nav className="flex flex-col gap-2">
        {menu.map((item, i) =>
          item.children ? (
            <div key={i} className="mb-1">
              <div className="flex items-center gap-2 px-2 py-2 font-semibold opacity-90">
                {item.icon}
                {item.label}
              </div>
              <div className="ml-7 flex flex-col gap-1">
                {item.children.map((child, ci) => (
                  <Link
                    key={ci}
                    to={child.path}
                    className={`rounded px-2 py-1 text-sm hover:bg-gray-800 transition
                      ${
                        location.pathname === child.path
                          ? 'bg-gray-700 font-bold'
                          : ''
                      }
                    `}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={i}
              to={item.path}
              className={`flex items-center gap-2 px-2 py-2 text-base rounded font-semibold hover:bg-gray-800 transition
                ${location.pathname === item.path ? 'bg-gray-700' : ''}
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        )}
      </nav>
    </aside>
  );
};

export default BackOfficeSidebar;
