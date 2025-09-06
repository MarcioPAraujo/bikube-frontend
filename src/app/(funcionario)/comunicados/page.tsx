'use client';

import { announcements } from '@/components/MOCK/annoucements';
import SearchBarComponent from '@/components/Inputs/SearchBar';
import { useEffect, useState } from 'react';
import { Table } from '@/components/Table/Index/Index';
import usePaginationRange from '@/hooks/usePaginationRange';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import Pagination from '@/components/Pagination/Pagination';
import AnnouncementDetailsModal from '@/components/modals/AnnouncementDetailsModal';
import DateInput from '@/components/Inputs/DateInput';
import { DefaultButton } from '@/components/Buttons/DefaultButton';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import RenderIf from '@/components/RenderIf/RenderIf';
import { ButtonRow, Content, FiltersContainer, Header, Page } from './styles';

const columns = ['Titulo', 'Conteúdo', 'Data'];
const AnnouncementsPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(search.toLowerCase()),
  );
  const pagination = usePaginationRange(
    filteredAnnouncements,
    DEFAULT_PAGE_SIZE,
  );
  const [detailsModal, setDetailsModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    pagination.setCurrentPage(1);
  }, [search]);

  return (
    <Page>
      <AnnouncementDetailsModal
        isOpen={detailsModal}
        onClose={() => setDetailsModal(false)}
        announcementId=""
      />

      <Header>
        <h1>Comunicados</h1>
        <FiltersContainer>
          <div>
            <DateInput
              id="startDate"
              date={startDate}
              setDate={setStartDate}
              label="Data de início"
              placeholder="dd/mm/aaaa"
            />
          </div>
          <div>
            <DateInput
              id="endDate"
              date={endDate}
              setDate={setEndDate}
              label="Data de término"
              placeholder="dd/mm/aaaa"
            />
          </div>
          <SearchBarComponent
            placeholder="Buscar comunicados"
            value={search}
            onSearch={e => setSearch(e.target.value)}
          />
        </FiltersContainer>
      </Header>
      <RenderIf isTrue={user?.role !== 'FUNCIONARIO'}>
        <DefaultButton
          text="Novo comunicado"
          classname="new-announcement-btn"
          onClick={() => router.push('/comunicados/novo')}
        />
      </RenderIf>
      <Table.Root tableClassName="announcements">
        <Table.Header columns={columns} />
        <Table.Body>
          {pagination.currentRows.map(announcement => (
            <ButtonRow
              type="button"
              key={announcement.id}
              onClick={() => setDetailsModal(true)}
            >
              <Table.Row>
                <Table.BodyCell>{announcement.title}</Table.BodyCell>
                <Table.BodyCell className="content">
                  <Content>{announcement.content}</Content>
                </Table.BodyCell>
                <Table.BodyCell>
                  {new Date(announcement.date).toLocaleDateString()}
                </Table.BodyCell>
              </Table.Row>
            </ButtonRow>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        setCurrentPage={pagination.setCurrentPage}
        totalOfData={announcements.length}
        totalPaginatedData={pagination.paginatedRows}
      />
    </Page>
  );
};
export default AnnouncementsPage;
