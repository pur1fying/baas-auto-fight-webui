import React from 'react';

interface props {
    sidebar : React.ReactNode
}

const DefaultLayoutSidebar = ({sidebar} :props) => {
    if (sidebar == null) return null;
    return (
        <aside className="w-84 border-r border-gray-200">
            {sidebar}
        </aside>
  );
};

export default DefaultLayoutSidebar;