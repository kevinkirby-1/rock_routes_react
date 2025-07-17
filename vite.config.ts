import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugIn: Partial<VitePWAOptions> = {
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  registerType: "prompt",
  manifest: {
    name: "Rock_Routes_React",
    short_name: "rock-route-react",
    description: "A web app for tracking rock climbing progress.",
    icons: [
      {
        src: "/rock_routes_logo_192px.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/rock_routes_logo_512px.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/rock_routes_logo_180px.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/rock_routes_logo_maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#89937c",
    background_color: "#89937c",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  server: { host: "0.0.0.0" },
});
