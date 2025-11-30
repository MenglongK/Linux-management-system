import { NextResponse } from 'next/server';

export async function GET() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' }
  ];
  
  return NextResponse.json(users);
}