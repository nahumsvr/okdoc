import FormularioMedico from './FormularioMedico';
import { SearchHeader } from '../components/search/SearchHeader';
import Sidebar from '../components/moscati/Sidebar';

export default function Page() {
  return (
    <div className="bg-surface text-on-surface h-screen overflow-hidden flex flex-col antialiased">
      <SearchHeader />
      <div className="flex flex-1 overflow-hidden h-full relative">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-surface p-8 xl:p-12 relative">
          <FormularioMedico />
        </main>
      </div>
    </div>
  );
}