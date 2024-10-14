// app/page.tsx
import { redirect } from 'next/navigation';
import { initializeTelemetry } from '../telemetry'; // Adjust the path based on your project structure

export default function Home() {
  // Initialize telemetry
  initializeTelemetry('textile-plm-digitalisation'); // Replace with your service name

  // Automatically redirect to landing page
  redirect('/landing-page');
  return null;
}
