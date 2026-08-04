import { NextRequest, NextResponse } from 'next/server';
import { INVITATION_DATA } from '@/lib/invitation-data';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('file') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No se recibieron archivos' }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || INVITATION_DATA.cloudinary?.cloudName;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || process.env.CLOUDINARY_UPLOAD_PRESET || INVITATION_DATA.cloudinary?.uploadPreset;

    if (!cloudName || !uploadPreset) {
      return NextResponse.json({ 
        error: 'Falta configurar CloudName o Upload Preset en Cloudinary' 
      }, { status: 400 });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      // Convert file to Base64 data URL for Cloudinary REST API
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = file.type || 'image/jpeg';
      const base64DataUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;

      // Upload directly to Cloudinary
      const cldFormData = new FormData();
      cldFormData.append('file', base64DataUrl);
      cldFormData.append('upload_preset', uploadPreset);

      const cldRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: cldFormData,
      });

      const cldData = await cldRes.json();

      if (!cldRes.ok) {
        console.error('Error desde Cloudinary API:', cldData);
        const errorMsg = cldData.error?.message || 'Error al subir la imagen a Cloudinary';
        return NextResponse.json({ 
          error: `Cloudinary error: ${errorMsg}. Revisa que el Upload Preset "${uploadPreset}" esté configurado en modo "Unsigned" (sin firma) en la consola de Cloudinary.` 
        }, { status: 400 });
      }

      if (cldData.secure_url || cldData.url) {
        uploadedUrls.push(cldData.secure_url || cldData.url);
      }
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
      count: uploadedUrls.length,
      message: `${uploadedUrls.length} foto(s) subida(s) con éxito a Cloudinary.`,
    });
  } catch (error: any) {
    console.error('Error en /api/upload:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno al procesar las fotos' },
      { status: 500 }
    );
  }
}

