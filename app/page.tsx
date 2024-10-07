// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Automatically redirect to landing page
  redirect('/landing-page');
  return null;
}
