import { NextResponse } from 'next/server';

export async function GET() {
  const servers = [
    { id: 1, name: 'Web Server', status: 'Online', ip: '192.168.1.10' },
    { id: 2, name: 'Database Server', status: 'Online', ip: '192.168.1.11' },
    { id: 3, name: 'Backup Server', status: 'Offline', ip: '192.168.1.12' }
  ];
  
  return NextResponse.json(servers);
}