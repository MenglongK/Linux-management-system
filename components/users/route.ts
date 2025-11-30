import { NextResponse } from 'next/server';

export async function GET() {
  const users = [
    { id: 1, name: 'យាន សុខា', email: 'yansokha@example.com', status: 'សកម្ម' },
    { id: 2, name: 'ស្រី ស្រស់', email: 'sreysros@example.com', status: 'សកម្ម' },
    { id: 3, name: 'ផល រស្មី', email: 'pholrathsamey@example.com', status: 'អសកម្ម' }
  ];
  
  return NextResponse.json(users);
}