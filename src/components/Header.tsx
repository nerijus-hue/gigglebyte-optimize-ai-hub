import { Home, User, Briefcase, Mail } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";

const Header = () => {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/about', icon: User },
    { name: 'Projects', url: '/projects', icon: Briefcase },
    { name: 'Contact', url: '/contact', icon: Mail }
  ];

  return <NavBar items={navItems} />;
};

export default Header;