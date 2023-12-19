import "intersection-observer";

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Assign the mock IntersectionObserver to the global object
declare global {
  interface Window {
    IntersectionObserver: typeof IntersectionObserver;
  }
}

global.IntersectionObserver = MockIntersectionObserver as any;
