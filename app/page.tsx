import {environmentPhotography} from '@/lib/clinic-photography';
import {Home} from '@/components/home';
export default function Page(){return <><link rel="preload" href={environmentPhotography.corridor.src} as="image" fetchPriority="high"/><Home/></>}
