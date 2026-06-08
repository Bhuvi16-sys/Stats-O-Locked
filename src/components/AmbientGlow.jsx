export default function AmbientGlow() {
  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#020b16] pointer-events-none"
      style={{ zIndex: -2 }}
    >
      <div className="ambient-orb ambient-orb--cyan" />
      <div className="ambient-orb ambient-orb--purple" />
      <div className="ambient-orb ambient-orb--blue" />
    </div>
  );
}
