import { NextResponse } from 'next/server';

export async function GET() {
  const servers = [
    { id: 1, name: 'ម៉ាស៊ីនបម្រើ Web', status: 'អនឡាញ', ip: '១៩២.១៦៨.១.១០' },
    { id: 2, name: 'ម៉ាស៊ីនបម្រើ Database', status: 'អនឡាញ', ip: '១៩២.១៦៨.១.១១' },
    { id: 3, name: 'ម៉ាស៊ីនបម្រើ Backup', status: 'អោអនឡាញ', ip: '១៩២.១៦៨.១.១២' }
  ];
  
  return NextResponse.json(servers);
}