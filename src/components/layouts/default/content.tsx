import React from 'react';

interface props {
    content : React.ReactNode
}

const DefaultLayoutContent = ({content} :props) => {
    if (content == null) return null;
    return (
        <main className="w-200 flex flex-col items-center justify-center">
            {content}
        </main>
  );
};

export default DefaultLayoutContent;