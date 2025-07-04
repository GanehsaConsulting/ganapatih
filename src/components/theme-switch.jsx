'use client'

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { HiMoon, HiSun } from 'react-icons/hi2';

export default function ThemeSwitch({ className }) {
  const { systemTheme, theme, setTheme } = useTheme('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className='flex z-555'>
      <label className="swap swap-rotate">
        {/* Hidden checkbox to control the state */}
        <input
          type="checkbox"
          onChange={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
          checked={currentTheme === 'dark'}
        />

        {/* Sun icon (for light mode) */}
        <div className='swap-off rounded-full'>
          <HiSun className={`${className} text-xl`} />
        </div>

        {/* Moon icon (for dark mode) */}
        <div className='swap-on rounded-full'>
          <HiMoon className={`${className} text-xl`} />
        </div>
      </label>
    </div>
  );
}
