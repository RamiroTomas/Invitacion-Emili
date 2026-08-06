import { NextRequest, NextResponse } from 'next/server';
import { INVITATION_DATA } from '@/lib/invitation-data';

function getSupabaseConfig() {
  let url = INVITATION_DATA.supabase?.url || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  let key = INVITATION_DATA.supabase?.anonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  if (
    url.includes('xyz.supabase.co') || 
    url.includes('tu_url') ||
    key === 'tu_anon_key' ||
    key === 'your_anon_key'
  ) {
    return null;
  }

  url = url.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  if (!url.includes('.')) {
    url = `${url}.supabase.co`;
  }

  return { url, key };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, ci, attending, diet, song, phone, adultResponsiblePhone } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 });
    }

    const config = getSupabaseConfig();
    console.log('SUPABASE CONFIG IN ROUTE:', config);

    if (!config) {
      console.warn('Supabase no está configurado. Se guarda en modo local.');
      return NextResponse.json({
        success: true,
        savedToSupabase: false,
        message: '¡Confirmación recibida!'
      });
    }

    const payload = {
      name: name.trim(),
      ci: ci ? ci.trim() : null,
      attending: attending === 'si' ? 'Sí' : 'No',
      diet: diet ? diet.trim() : null,
      song: song ? song.trim() : null,
      phone: phone ? phone.trim() : null,
      adultResponsiblePhone: adultResponsiblePhone ? adultResponsiblePhone.trim() : null,
      created_at: new Date().toISOString()
    };

    const endpoint = `${config.url}/rest/v1/rsvp`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': config.key,
        'Authorization': `Bearer ${config.key}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(payload),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Error enviando a Supabase REST:', response.status, errText);

      // Retry without 'ci' if column missing
      if (errText.includes('ci') || errText.includes('adultResponsiblePhone') || errText.includes('adult_responsible_phone')) {
        const payloadNoCi = { ...payload };
        delete (payloadNoCi as any).ci;
        delete (payloadNoCi as any).adultResponsiblePhone;
        payloadNoCi.name = `${name.trim()} (C.I: ${ci ? ci.trim() : ''})`;

        const retryRes = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': config.key,
            'Authorization': `Bearer ${config.key}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(payloadNoCi),
          cache: 'no-store'
        });

        if (retryRes.ok) {
          const retryData = await retryRes.json();
          return NextResponse.json({
            success: true,
            data: retryData,
            savedToSupabase: true,
            message: '¡Confirmación registrada con éxito en Supabase!'
          });
        }
      }

      return NextResponse.json({
        success: true,
        savedToSupabase: false,
        message: '¡Confirmación recibida!'
      });
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      data,
      savedToSupabase: true,
      message: '¡Confirmación registrada con éxito en Supabase!'
    });

  } catch (err: any) {
    console.error('Error en /api/rsvp:', err);
    return NextResponse.json({
      success: true,
      savedToSupabase: false,
      message: '¡Confirmación recibida!'
    });
  }
}

export async function GET() {
  try {
    const config = getSupabaseConfig();
    if (!config) {
      return NextResponse.json({ error: 'Supabase no está configurado' }, { status: 400 });
    }

    const endpoint = `${config.url}/rest/v1/rsvp?select=*&order=created_at.desc`;
    const response = await fetch(endpoint, {
      headers: {
        'apikey': config.key,
        'Authorization': `Bearer ${config.key}`
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, count: data?.length || 0, rsvps: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

