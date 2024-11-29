import { NextResponse } from 'next/server'

import { supabase } from '../../../../lib/supabaseClient'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  const response = await supabase.storage
    .from('learning-phase') // target bucket name
    .upload(file.name, file)

  return NextResponse.json(response)
}

export async function GET() {
  const response = await supabase.storage.from('learning-phase').list()
  return NextResponse.json(response)
}
// Advanced: URLも取得する場合
// export async function GET() {
//   const response = await supabase.storage.from('learning-phase').list()
//   const res: { name: string; url: string }[] = []
//   response.data?.forEach((file) => {
//     const { data } = supabase.storage.from('learning-phase').getPublicUrl(file.name)
//     res.push({ name: file.name, url: data.publicUrl })
//   })
//   return NextResponse.json(res)
// }
