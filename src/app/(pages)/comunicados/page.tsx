'use client';

import { announcements } from '@/components/MOCK/annoucements';
import SearchBarComponent from '@/components/Inputs/SearchBar';
import { useEffect, useState } from 'react';
import { ButtonRow, Content, Header, Page } from './styles';
import { Table } from '@/components/Table/Index/Index';
import usePaginationRange from '@/hooks/usePaginationRange';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import Pagination from '@/components/Pagination/Pagination';
import AnnouncementDetailsModal from '@/components/modals/AnnouncementDetailsModal';

const columns = ['Titulo', 'Conteúdo', 'Data'];
const AnnouncementsPage = () => {
  const [search, setSearch] = useState('');
  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(search.toLowerCase()),
  );
  const pagination = usePaginationRange(filteredAnnouncements, DEFAULT_PAGE_SIZE);
  const [detailsModal, setDetailsModal] = useState(false);

  useEffect(() => {
    pagination.setCurrentPage(1);
  }, [search]);

  return (
    <Page>
      <AnnouncementDetailsModal isOpen={detailsModal} onClose={() => setDetailsModal(false)} announcementId={''} />

      <Header>
        <h1>Comunicados</h1>
        <div>
          <SearchBarComponent
            placeholder="Buscar comunicados"
            value={search}
            onSearch={e => setSearch(e.target.value)}
          />
        </div>
      </Header>
      <Table.Root tableClassName="announcements">
        <Table.Header columns={columns} />
        <Table.Body>
          {pagination.currentRows.map(announcement => (
            <ButtonRow type="button" key={announcement.id} onClick={() => setDetailsModal(true)}>
              <Table.Row>
                <Table.BodyCell>{announcement.title}</Table.BodyCell>
                <Table.BodyCell className="content">
                  <Content>{announcement.content}</Content>
                </Table.BodyCell>
                <Table.BodyCell>{new Date(announcement.date).toLocaleDateString()}</Table.BodyCell>
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
