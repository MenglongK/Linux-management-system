import { NextResponse } from 'next/server';

export async function GET() {
  // ទិន្នន័យឧទាហរណ៍សម្រាប់ Groups
  const groups = [
    { id: 1, name: 'អ្នកគ្រប់គ្រង', memberCount: 5 },
    { id: 2, name: 'អ្នកប្រើប្រាស់', memberCount: 25 },
    { id: 3, name: 'ភ្ញៀវ', memberCount: 10 }
  ];
  
  return NextResponse.json(groups);
}