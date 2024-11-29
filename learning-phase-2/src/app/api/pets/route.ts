import { NextResponse } from 'next/server'

import prisma from '../../../../lib/prisma'

// GET /api/pets
export async function GET() {
  const pets = await prisma.pet.findMany({
    orderBy: { id: 'asc' },
    select: { id: true, name: true, imageUrl: true, owner: { select: { name: true } } }
  })
  return NextResponse.json({ pets })
}
