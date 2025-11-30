import { NextResponse } from 'next/server';

export async function GET() {
  // ទិន្នន័យឧទាហរណ៍សម្រាប់ Groups
  const groups = [
    { id: 1, name: 'Administrators', memberCount: 5 },
    { id: 2, name: 'Users', memberCount: 25 },
    { id: 3, name: 'Guests', memberCount: 10 }
  ];
  
  return NextResponse.json(groups);
}