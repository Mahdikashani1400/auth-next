"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  const loginPage = ()=>{
    router.push('/auth');

  }
  return (
    <>
    <div className={styles.loginBtn}>
    <Button onClick={loginPage}>صفحه ورود</Button>

    </div>
    </>
  );
}
