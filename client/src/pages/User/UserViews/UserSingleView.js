import React from 'react';
import { useSelector } from 'react-redux';
import { useUserView } from '../UserHooks';

export const UserSingleView = () => {
  const { selectedUser } = useUserView();

  return <h1>Single User View</h1>
};
