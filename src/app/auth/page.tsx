'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import styles from './auth.module.scss';
import { fetchUserFromCustomAPI } from '@/lib/api';

const schema = z.object({
  username: z
    .string()
    .min(1, "نام کاربری الزامی است"),
    
  firstName: z
    .string()
    .min(1, "نام و نام خانوادگی الزامی است"),
    
    
  email: z
    .string()
    .email("ایمیل معتبر وارد کنید"),
    
  phone: z
    .string()
    .regex(/^09\d{9}$/, "شماره باید با 09 شروع شده و 11 رقم باشد"),
});

type FormData = z.infer<typeof schema>;

const AuthPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    try {
      const data = await fetchUserFromCustomAPI();
      localStorage.setItem('user', JSON.stringify(data));
      router.push('/dashboard');
    } catch (error) {
      alert('خطا در ورود: ' + error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>ورود</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Input
          label="نام و نام خانوادگی"
          placeholder="علی حسنی"
          {...register('firstName')}

          error={errors.firstName?.message}
        />
        <Input
          label="نام کاربری"
          placeholder="ali_hasani"
          {...register('username')}

          error={errors.username?.message}
        />
        <Input
          label="ایمیل"
          placeholder="ali_hasani@gmail.com"
          {...register('email')}

          error={errors.email?.message}
        />
      
        <Input
          label="شماره موبایل"
          placeholder="09123456789"
          {...register('phone')}
          error={errors.phone?.message}
        />
        <Button type="submit" disabled={isSubmitting}>
          ورود
        </Button>
      </form>
    </div>
  );
};

export default AuthPage;
