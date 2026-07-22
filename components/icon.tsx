import {
  Award,
  Boxes,
  Brush,
  CheckCircle2,
  Dumbbell,
  Hammer,
  Layers,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Zap,
  type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  Award,
  Boxes,
  Brush,
  CheckCircle2,
  Dumbbell,
  Hammer,
  Layers,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Zap,
}

export function Icon({ name }: { name: string }) {
  const Cmp = map[name] ?? Hammer
  return <Cmp aria-hidden="true" />
}
