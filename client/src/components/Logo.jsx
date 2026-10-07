import logoUrl from '../assets/logo.png';

export default function Logo({ className = 'h-10' }) {
  return <img src={logoUrl} alt="WIM" className={`${className} w-auto object-contain`} />;
}
