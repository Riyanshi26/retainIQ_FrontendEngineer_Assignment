'use client'
import styles from "./page.module.css";
import Sidebar from "./components/Sidebar/Sidebar";
import MainArea from "./components/MainArea/MainArea";

export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar />
      <MainArea />
    </div>
  )
}
