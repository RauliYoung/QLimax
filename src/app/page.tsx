import {BlogPostComponent} from '@/app/components/blogpost/blogpost';
import MoonIcon from '@/app/components/ui/icons/moonicon';
import SunIcon from '@/app/components/ui/icons/sunicon';
export default function Main() {
  return (
    <div>
      <MoonIcon />
      <SunIcon />
      <BlogPostComponent />
    </div>
  );
}
