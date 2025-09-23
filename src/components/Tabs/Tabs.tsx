import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Description, TabList, TabsContainer } from './styles';

export interface ITab {
  label: string;
  url: string;
  baseUrl: string;
  description: string;
}

interface TabsProps {
  tabs: ITab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const pathname = usePathname();
  const descriptionRef = useRef<string>('');

  const selectedClassname = (tab: ITab): string => {
    const isSelected =
      pathname === tab.baseUrl || pathname.startsWith(`${tab.baseUrl}/`);
    if (isSelected) {
      descriptionRef.current = tab.description;
      return 'selected';
    }
    return '';
  };

  return (
    <nav>
      <div>
        <TabList>
          {tabs.map(tab => (
            <li key={tab.url}>
              <TabsContainer href={tab.url} className={selectedClassname(tab)}>
                {tab.label}
              </TabsContainer>
            </li>
          ))}
        </TabList>
        <Description>{descriptionRef.current}</Description>
      </div>
    </nav>
  );
};
export default Tabs;
