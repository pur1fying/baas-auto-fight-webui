import React from 'react';

interface props {
    header : React.ReactNode
}

const DefaultLayoutHeader = ({header} :props) => {
    if (header == null) return null;
    return (
        <header className="border-b border-gray-200 p-0">
            {header}
        </header>
  );
};

export default DefaultLayoutHeader;