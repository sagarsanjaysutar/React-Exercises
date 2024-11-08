/**
 * @brief The root page that automatically gets detected by Next.js development server.
 * @note A required file for Next.js.
 * @refer https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#index-routes
 */
import React, { FC } from 'react';
import Home from '@/sections/home/home';

const Root: FC = () => <Home />;

export default Root;
