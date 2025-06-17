'use client';

import { announcements } from '@/components/MOCK/annoucements';
import SearchBarComponent from '@/components/Inputs/SearchBar';
import { useEffect, useState } from 'react';
import { Content, Header, Page } from './styles';
import { Table } from '@/components/Table/Index/Index';
import usePaginationRange from '@/hooks/usePaginationRange';
import { DEFAULT_PAGE_SIZE } from '@/utils/defaultPageSize';
import Pagination from '@/components/Pagination/Pagination';

const columns = ['Titulo', 'Conteúdo', 'Data'];
const AnnouncementsPage = () => {
  const [search, setSearch] = useState('');
  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(search.toLowerCase()),
  );
  const pagination = usePaginationRange(filteredAnnouncements, DEFAULT_PAGE_SIZE);

  useEffect(() => {
    pagination.setCurrentPage(1);
  }, [search]);

  return (
    <Page>
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
            <Table.Row key={announcement.id}>
              <Table.BodyCell>{announcement.title}</Table.BodyCell>
              <Table.BodyCell className="content">
                <Content>{announcement.content}</Content>
              </Table.BodyCell>
              <Table.BodyCell>{new Date(announcement.date).toLocaleDateString()}</Table.BodyCell>
            </Table.Row>
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
