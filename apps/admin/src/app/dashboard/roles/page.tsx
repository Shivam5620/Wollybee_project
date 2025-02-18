import React, { Suspense } from 'react';
import Loader from '../../components/common/Loader';
import ListRolesContainer from './ListRolesContainer';

const Roles = () => {
  return (
    <div>
      <Suspense fallback={<Loader text="Loading Roles" />}>
        <ListRolesContainer />
      </Suspense>
    </div>
  );
};

export default Roles;
