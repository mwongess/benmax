import { useRouter } from 'next/navigation';

export default function UseNavigation() {
  const router = useRouter();

  function navigateTo(path:string) {
    router.push(path);
  }

  return navigateTo;
}