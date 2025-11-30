import { NextResponse } from 'next/server';

export async function GET() {
  const resources = [
    { id: 1, name: 'CPU Usage', value: '45%' },
    { id: 2, name: 'Memory', value: '62%' },
    { id: 3, name: 'Disk Space', value: '78%' }
  ];
  
  return NextResponse.json(resources);
}