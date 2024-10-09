import React from 'react';
import { hourglass } from 'ldrs';

hourglass.register();

const Loader: React.FC = () => {
  return (
    <l-hourglass
      size="60"         
      bg-opacity="0.1"  
      speed="2.5"      
      color="gray"   
    ></l-hourglass>
  );
};

export default Loader;
