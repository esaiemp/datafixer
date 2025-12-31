import { redirect } from 'next/navigation';

export default function OldToolPage() {
  redirect('/csv/remove-duplicates');
}
