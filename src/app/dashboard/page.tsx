'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.scss';
import Button from '@/components/Button/Button';

interface UserData {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
}

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/auth');
    } else {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch {
        router.push('/auth');
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/auth');
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <h1>🎉 خوش اومدی {user.name.first} {user.name.last}!</h1>
      <img src={user.picture.large} alt="User Avatar" className={styles.avatar} />
      <div className={styles.logoutWrapper}>
        <Button onClick={handleLogout}>خروج از حساب</Button>
      </div>
    </div>
  );
};

export default DashboardPage;
