import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site';

export const runtime = 'edge';

const COLORS = {
  bgFrom: '#1B4332',
  bgMid: '#2D6A4F',
  bgTo: '#40916C',
  text: '#FFFBF5',
  accent: '#FFD4A3',
};

/**
 * OG image generador dinámico (1200×630 PNG) consumido por
 * `siteConfig.defaultOgImage`. Existe porque Twitter, LinkedIn,
 * WhatsApp y Slack no renderizan SVG en las previews.
 *
 * Acepta `?title=` y `?subtitle=` para personalizar por página
 * desde `buildMetadata` cuando haga falta.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || siteConfig.name;
  const subtitle =
    searchParams.get('subtitle') || 'El ERP que tus perros merecen';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          color: COLORS.text,
          backgroundImage: `linear-gradient(135deg, ${COLORS.bgFrom} 0%, ${COLORS.bgMid} 60%, ${COLORS.bgTo} 100%)`,
          fontFamily: 'system-ui, Inter, sans-serif',
        }}
      >
        <div
          style={{
            width: 92,
            height: 92,
            borderRadius: 22,
            background: COLORS.text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: COLORS.bgMid,
            fontSize: 56,
            fontWeight: 800,
          }}
        >
          P
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: -3,
            marginTop: 60,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 600,
            color: COLORS.accent,
            letterSpacing: -1,
            marginTop: 16,
            maxWidth: 980,
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 500, opacity: 0.85 }}>
            Salud · Camadas · Ventas · Portal del cliente · Finanzas
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, opacity: 0.65 }}>
            petwellly.com
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
