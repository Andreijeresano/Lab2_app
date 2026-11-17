import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, ChevronDown, ChevronRight, Clock3, Code2, Globe2, GraduationCap, Heart, House, Info, Layers3, Mail, MapPin, Menu, Search, ShieldCheck, Sparkles, Users, X } from 'lucide-react';

const icons = { graduation: GraduationCap, home: House, users: Users, book: BookOpen, info: Info, 'arrow-right': ArrowRight, 'arrow-up-right': ArrowUpRight, search: Search, 'chevron-down': ChevronDown, 'chevron-right': ChevronRight, x: X, mail: Mail, clock: Clock3, 'map-pin': MapPin, check: Check, calendar: CalendarDays, layers: Layers3, code: Code2, globe: Globe2, sparkles: Sparkles, menu: Menu, shield: ShieldCheck, heart: Heart };

export default function Icon({ name, size = 20, ...props }) {
  const Component = icons[name] || BookOpen;
  return <Component size={size} strokeWidth={1.7} aria-hidden="true" {...props} />;
}
