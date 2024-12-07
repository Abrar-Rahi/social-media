import React, { useState } from 'react';
import { List } from '../../svg/List';
import { Grid } from '../../svg/Grid';

const ProfilePostView = ({ viewMode, setViewMode }) => {


  return (
    <>
      <div className="p-4 bg-hober_clr rounded-md mb-3">
        {/* Left Side: Title */}
        <div className="text-xl font-gilroyBold text-black">Posts</div>
        <div className='w-full h-px bg-white my-5'></div>

        {/* View Mode Switcher */}
        <div className="flex items-center">
          <button
            onClick={() => setViewMode('list')}
            className={`w-[48%] flex items-center justify-center gap-x-2 text-black font-gilroyBold text-base pb-3 border-b-2  ${viewMode === 'list' ? 'text-blue border-blue ' : 'border-hober_clr'
              }`}
          >
            <List />
            List view
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`w-[48%] flex items-center justify-center gap-x-2 text-black font-gilroyBold text-base pb-3 border-b-2  ${viewMode === 'grid' ? 'text-blue  border-blue ' : 'border-hober_clr'
              }`}
          >
            <Grid />
            Grid view
          </button>
        </div>
      </div>
     

    </>
  );
};

export default ProfilePostView;
