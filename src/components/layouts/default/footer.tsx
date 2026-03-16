import React from 'react';

interface props {
    footer : React.ReactNode
}

const DefaultLayoutFooter = ({footer} :props) => {
    if (footer == null) return null;
    return (
        <footer>
            {footer}
        </footer>
  );
};

export default DefaultLayoutFooter;