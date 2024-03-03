'use client';
import SettingsPage from '../components/authModals/settings';
import {useContext} from 'react';
import {UserContext} from '@/app/contexts/usercontext';

const Settings = () => {
  const {user} = useContext(UserContext);
  if (!user) return null;
  return <SettingsPage />;
};
export default Settings;
