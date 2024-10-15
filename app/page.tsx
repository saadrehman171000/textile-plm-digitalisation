// app/page.tsx
import { redirect } from 'next/navigation';
import { register as initializeTelemetry } from '../instrumentation'; // Adjust based on your actual structure

export default function Home() {
  // Initialize telemetry
  initializeTelemetry(); // Replace with your service name

  // Automatically redirect to landing page
  redirect('/landing-page');
  return null;
}
