'use client';

import { useState } from 'react';

export type BeforeAfterImage = {
  src: string;
  alt: string;
};

const DEFAULT_IMAGES: BeforeAfterImage[] = [
  { src: '/bao1.jpg', alt: 'Property clean-out — result 1' },
  { src: '/bao2.jpg', alt: 'Property clean-out — result 2' },
  { src: '/bao3.jpg', alt: 'Property clean-out — result 3' },
  { src: '/bao4.jpg', alt: 'Property clean-out — result 4' },
  { src: '/bao5.jpg', alt: 'Property clean-out — result 5' },
  { src: '/bao6.png', alt: 'Property clean-out — result 6' },
  { src: '/bao7.png', alt: 'Property clean-out — result 7' },
];

type SectionProps = {
  images?: BeforeAfterImage[];
};

export function BeforeAfterSection({ images = DEFAULT_IMAGES }: SectionProps) {
  const [index, setIndex] = useState(0);
  const n = images.length;
  if (n === 0) return null;

  const safeIndex = index % n;
  const next = () => setIndex((i) => (i + 1) % n);
  const prev = () => setIndex((i) => (i - 1 + n) % n);
  const current = images[safeIndex];

  return (
    <section id="before-after" className="before-after-section" aria-labelledby="before-after-heading">
      <div className="container">
        <div className="before-after-header">
          <div className="section-label-blue">• RESULTS</div>
          <h2 id="before-after-heading" className="before-after-title">
            <span className="title-black">Before</span>{' '}
            <span className="title-blue">&amp; After</span>
          </h2>
          <p className="before-after-lead">
            Browse our clean-out transformations — use the arrows or dots to move between photos.
          </p>
        </div>

        <div className="testimonials-carousel before-after-carousel">
          <button
            type="button"
            className="carousel-arrow carousel-arrow-left"
            onClick={prev}
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <figure className="before-after-figure before-after-carousel__slide">
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="before-after-full-img"
              loading={safeIndex === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </figure>

          <button
            type="button"
            className="carousel-arrow carousel-arrow-right"
            onClick={next}
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="testimonials-dots before-after-carousel__dots" role="tablist" aria-label="Choose photo">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === safeIndex}
              className={`dot ${i === safeIndex ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Photo ${i + 1} of ${n}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
