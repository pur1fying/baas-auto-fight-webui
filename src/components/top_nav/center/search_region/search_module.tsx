'use client'
import './top_nav_search_module.css'
import {ButtonGroup, Button} from '@primer/react'

function SearchModule() {
  return (
    <ButtonGroup as='div' className="top_nav_search_module">
      <Button 
        size="medium"
        variant="invisible"
      >Search</Button>
      
    </ButtonGroup>
  );
};

export default SearchModule;
