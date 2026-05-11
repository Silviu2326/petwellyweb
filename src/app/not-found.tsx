/**
 * Root not-found. Para rutas que ni siquiera matchean un locale,
 * Next.js puede caer aquí. Como no podemos usar `useTranslations`
 * sin contexto, emitimos un 404 minimal en español e inglés.
 */
export default function RootNotFound() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="robots" content="noindex" />
        <title>404 · Petwellly</title>
        <style>{`
          body{font-family:system-ui,Inter,sans-serif;background:#FFFBF5;color:#1C1C1E;margin:0;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px;text-align:center}
          .b{font-size:96px;font-weight:800;color:#E8F5EC;line-height:1;margin:0 0 16px}
          h1{margin:0 0 8px;font-size:32px;font-weight:800}
          p{margin:0 0 24px;color:#6B6B78;max-width:420px}
          a{display:inline-block;background:#2D6A4F;color:#fff;padding:12px 20px;border-radius:14px;font-weight:700;text-decoration:none;margin:0 6px}
        `}</style>
      </head>
      <body>
        <div>
          <div className="b">404</div>
          <h1>Página no encontrada · Page not found</h1>
          <p>
            Lo sentimos, no encontramos lo que buscabas. — Sorry, we couldn&apos;t find what you were
            looking for.
          </p>
          <a href="/es">Volver al inicio</a>
          <a href="/en">Back to home</a>
        </div>
      </body>
    </html>
  );
}
