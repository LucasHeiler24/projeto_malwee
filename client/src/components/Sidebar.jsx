export default function Sidebar({}) {
  return (
    <aside className='' h-screen>
      <nav className='h-full flex flex-col bg-white border-r shadow-sm'>
        <div className='p-4 pb-2 flex justify-between items-center'>
          <img src='../images/malwee-logo' className='w-32' alt='' />
          <button className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'>
            <ChevronFirst />
          </button>
        </div>
        <ul className='flex-1 px-3'>{children}</ul>
        <div className='border-t flex p-3 '>
          <img src='../images/user-image' className='w-10 h-10 rounded-md' alt='' />
          <div className={`flex justify-between items-center w-52 ml-3`}>
            <div className='leading-4'>
              <h4 className='font-semibold'>Usuário</h4>
              <span className='' text-xs text-gray-600>
                matricula-user
              </span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  return (
    <li>
      {icon}
      <span>{text}</span>
    </li>
  );
}
