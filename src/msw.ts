export async function initMockServiceWorker() {
  if (typeof window !== "undefined") {
    const { worker } = await import("./mocks/browser");
    worker.start();
  }
}
