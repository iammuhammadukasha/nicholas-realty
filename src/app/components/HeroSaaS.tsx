'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const LEFT_PROFILES = [
  { name: 'Sarah Chen', role: 'HR Director', avatar: 'https://i.pravatar.cc/80?u=1' },
  { name: 'James Wilson', role: 'People Ops', avatar: 'https://i.pravatar.cc/80?u=2' },
  { name: 'Emma Davis', role: 'Talent Lead', avatar: 'https://i.pravatar.cc/80?u=3' },
  { name: 'Alex Rivera', role: 'HR Manager', avatar: 'https://i.pravatar.cc/80?u=4' },
];

const RIGHT_PROFILES = [
  { name: 'Maya Patel', role: 'Recruitment', avatar: 'https://i.pravatar.cc/80?u=5' },
  { name: 'David Kim', role: 'Benefits', avatar: 'https://i.pravatar.cc/80?u=6' },
  { name: 'Jordan Lee', role: 'Compliance', avatar: 'https://i.pravatar.cc/80?u=7' },
  { name: 'Taylor Brown', role: 'Operations', avatar: 'https://i.pravatar.cc/80?u=8' },
];

const BOTTOM_PROFILES = [
  { name: 'Casey Moore', role: 'HR Analyst', avatar: 'https://i.pravatar.cc/80?u=9' },
  { name: 'Riley Clark', role: 'Onboarding', avatar: 'https://i.pravatar.cc/80?u=10' },
  { name: 'Morgan Hill', role: 'Engagement', avatar: 'https://i.pravatar.cc/80?u=11' },
  { name: 'Quinn Adams', role: 'Learning', avatar: 'https://i.pravatar.cc/80?u=12' },
];

const ORBIT_RADIUS = 160;
const ORBIT_CENTER_OFFSET_X = 200;
const CARD_WIDTH = 140;
const CARD_HEIGHT = 88;

function ProfileCard({
  name,
  role,
  avatar,
  angleOffset,
  orbitAngle,
  orbitCenterX,
  orbitCenterY,
}: {
  name: string;
  role: string;
  avatar: string;
  angleOffset: number;
  orbitAngle: ReturnType<typeof useMotionValue<number>>;
  orbitCenterX: number;
  orbitCenterY: number;
}) {
  const angle = useTransform(orbitAngle, (a) => a + angleOffset);
  const x = useTransform(
    angle,
    (a) =>
      orbitCenterX +
      ORBIT_RADIUS * Math.cos((a * Math.PI) / 180) -
      CARD_WIDTH / 2
  );
  const y = useTransform(
    angle,
    (a) =>
      orbitCenterY +
      ORBIT_RADIUS * Math.sin((a * Math.PI) / 180) -
      CARD_HEIGHT / 2
  );
  const rotate = useTransform(orbitAngle, (a) => -(a + angleOffset));
  const depth = useTransform(angle, (a) => (Math.cos((a * Math.PI) / 180) + 1) / 2);
  const scale = useTransform(depth, (d) => 0.82 + 0.18 * d);
  const opacity = useTransform(depth, (d) => 0.65 + 0.35 * d);

  return (
    <motion.div
      className="hero-saas-orbit-card"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        x,
        y,
        rotate,
        scale,
        opacity,
      }}
    >
      <div className="hero-saas-profile-inner">
        <div className="hero-saas-avatar-wrap">
          <img src={avatar} alt="" className="hero-saas-avatar" />
        </div>
        <div className="hero-saas-profile-text">
          <span className="hero-saas-profile-name">{name}</span>
          <span className="hero-saas-profile-role">{role}</span>
        </div>
      </div>
    </motion.div>
  );
}

function BottomCard({ name, role, avatar, delay }: { name: string; role: string; avatar: string; delay: number }) {
  return (
    <motion.div
      className="hero-saas-bottom-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="hero-saas-profile-inner">
        <div className="hero-saas-avatar-wrap">
          <img src={avatar} alt="" className="hero-saas-avatar" />
        </div>
        <div className="hero-saas-profile-text">
          <span className="hero-saas-profile-name">{name}</span>
          <span className="hero-saas-profile-role">{role}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function HeroSaaS() {
  const [mounted, setMounted] = useState(false);
  const orbitAngleLeft = useMotionValue(0);
  const orbitAngleRight = useMotionValue(0);
  const floatY = useMotionValue(0);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let rafId: number;
    let t = 0;
    const step = () => {
      t += 0.15;
      orbitAngleLeft.set(t % 360);
      orbitAngleRight.set(-t % 360);
      floatY.set(Math.sin(t * 0.02) * 6);
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [mounted, orbitAngleLeft, orbitAngleRight, floatY]);

  const leftAngles = [0, 90, 180, 270];
  const rightAngles = [0, 90, 180, 270];

  return (
    <section className="hero-saas" id="home">
      <div className="hero-saas-bg" aria-hidden />
      <div className="hero-saas-layout">
        {/* Left orbit - only render animated cards after mount to avoid hydration mismatch */}
        <div
          className="hero-saas-orbit hero-saas-orbit--left"
          ref={leftRef}
          style={{ position: 'relative' }}
        >
          {mounted &&
            LEFT_PROFILES.map((p, i) => (
              <ProfileCard
                key={p.name}
                name={p.name}
                role={p.role}
                avatar={p.avatar}
                angleOffset={leftAngles[i]}
                orbitAngle={orbitAngleLeft}
                orbitCenterX={ORBIT_CENTER_OFFSET_X}
                orbitCenterY={220}
              />
            ))}
        </div>

        {/* Center hero content */}
        <motion.div
          className="hero-saas-center"
          style={mounted ? { y: floatY } : undefined}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="hero-saas-glass">
            <h1 className="hero-saas-title">Core HR solutions</h1>
            <p className="hero-saas-subtitle">
              Streamline HR processes in one centralized platform, enhancing team transparency.
            </p>
            <a href="#about" className="hero-saas-cta">
              Learn more
            </a>
          </div>
        </motion.div>

        {/* Right orbit - only render animated cards after mount to avoid hydration mismatch */}
        <div className="hero-saas-orbit hero-saas-orbit--right" ref={rightRef} style={{ position: 'relative' }}>
          {mounted &&
            RIGHT_PROFILES.map((p, i) => (
              <ProfileCard
                key={p.name}
                name={p.name}
                role={p.role}
                avatar={p.avatar}
                angleOffset={rightAngles[i]}
                orbitAngle={orbitAngleRight}
                orbitCenterX={ORBIT_CENTER_OFFSET_X}
                orbitCenterY={220}
              />
            ))}
        </div>
      </div>

      {/* Bottom cards */}
      <div className="hero-saas-bottom">
        {BOTTOM_PROFILES.map((p, i) => (
          <BottomCard key={p.name} name={p.name} role={p.role} avatar={p.avatar} delay={0.2 + i * 0.08} />
        ))}
      </div>
    </section>
  );
}
