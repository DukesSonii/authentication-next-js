// src/pages/index.js

import { useRouter } from 'next/router';
import MainRole from './MainRole';

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <MainRole />
    </div>
  );
}
