import { NextResponse } from 'next/server';

export async function GET() {
  const resources = [
    { id: 1, name: 'ការប្រើប្រាស់ CPU', value: '៤៥%' },
    { id: 2, name: 'អង្គចងចាំ', value: '៦២%' },
    { id: 3, name: 'ទំហំថាស', value: '៧៨%' }
  ];
  
  return NextResponse.json(resources);
}