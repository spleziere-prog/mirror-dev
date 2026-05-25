export function generateHTML(graph: string) {
  return `
  <html>
    <head>
      <script type="module">
        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.esm.min.mjs';

        mermaid.initialize({
          startOnLoad: true,
          theme: 'dark',
          flowchart: {
            curve: 'basis'
          }
        });
      </script>

      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background:
            radial-gradient(circle at top left, #1e293b, #020617);
          color: white;
          font-family: Inter, sans-serif;
          min-height: 100vh;
          padding: 40px;
          overflow-x: auto;
        }

        h1 {
          font-size: 64px;
          margin-bottom: 40px;
          font-weight: 800;
          letter-spacing: -2px;

          background: linear-gradient(
            90deg,
            #60a5fa,
            #a78bfa
          );

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .container {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 40px;
          backdrop-filter: blur(20px);
          overflow: auto;
        }

        .mermaid {
          display: flex;
          justify-content: center;
          min-width: 1200px;
        }

        ::-webkit-scrollbar {
          height: 10px;
          width: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 999px;
        }
      </style>
    </head>

    <body>
      <h1>MIRROR.dev</h1>

      <div class="container">
        <div class="mermaid">
          ${graph}
        </div>
      </div>
    </body>
  </html>
  `
}