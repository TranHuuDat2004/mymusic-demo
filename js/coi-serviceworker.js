/*! coi-serviceworker.js - v0.1.7 - MIT License © 2021-2023 Guido De Caso */
if (typeof window === "undefined") {
    self.addEventListener("install", () => self.skipWaiting());
    self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

    self.addEventListener("fetch", (event) => {
        if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin") {
            return;
        }

        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    if (response.status === 0) {
                        return response;
                    }

                    const newHeaders = new Headers(response.headers);
                    newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
                    newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

                    return new Response(response.body, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: newHeaders,
                    });
                })
                .catch((e) => console.error(e))
        );
    });
} else {
    (() => {
        const sc = document.createElement("script");
        sc.src = "js/coi-serviceworker.js";
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register(window.location.pathname + "js/coi-serviceworker.js").then(
                (registration) => {
                    console.log("COI Service Worker registered", registration.scope);
                    registration.addEventListener("updatefound", () => {
                        console.log("COI Service Worker update found, reloading...");
                        window.location.reload();
                    });

                    if (registration.active && !navigator.serviceWorker.controller) {
                        console.log("COI Service Worker active, reloading...");
                        window.location.reload();
                    }
                },
                (err) => {
                    console.error("COI Service Worker registration failed: ", err);
                }
            );
        }
    })();
}
