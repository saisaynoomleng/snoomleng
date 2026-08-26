import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const BackTo = ({ label, href }: { href: string; label: string }) => {
  return (
    <Link href={href} className="flex gap-x-2 items-center group">
      <span className="group-hover:-translate-x-1 duration-200 transition-transform">
        <FaArrowLeft />
      </span>
      <span>Back To {label}</span>
    </Link>
  );
};

export default BackTo;
