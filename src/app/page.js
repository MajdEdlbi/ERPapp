"use client"
import styles from "./page.module.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import Maincontent from "@/components/Maincontent/Maincontent";

const theme = createTheme({
  direction: 'rtl',
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function Home() {
  return (
    <main className={styles.main}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
              <Maincontent/>
         </ThemeProvider>
      </CacheProvider>
    </main>
  );
}
