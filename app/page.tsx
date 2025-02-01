"use client";

export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f9',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <img
        src="/logo_schriftzug.png"
        alt="Schmacht Logo"
        style={{ width: '150px', marginBottom: '20px' }}
      />
      <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '1rem' }}>
        Willkommen bei Schmacht!
      </h1>
      <button
        style={{
          padding: '15px 30px',
          fontSize: '1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => (window.location.href = "/shop")}
      >
        Shop entdecken
      </button>
    </main>
  );
}
