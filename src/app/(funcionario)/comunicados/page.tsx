'use client';

import SearchBarComponent from '@/components/Inputs/SearchBar';
import { useEffect, useRef, useState } from 'react';
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
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import {
  getMyNotifications,
  updateAnnouncement,
} from '@/services/announcementsService';
import { IAnnouncementsResponse } from '@/interfaces/anouncement/annoucementsResponse';
import { notifyError } from '@/utils/handleToast';
import {
  ButtonRow,
  Content,
  FiltersContainer,
  Header,
  NotSeenIndicator,
  Page,
} from './styles';

const columns = ['Titulo', 'Conteúdo', 'Data'];
const AnnouncementsPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [detailsModal, setDetailsModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const announcementIdRef = useRef<number>(-1);

  const userId = user?.id || '';

  const { data, refetch } = useQuery({
    queryKey: ['announcemnts'],
    queryFn: async () => {
      const result = await getMyNotifications(userId);
      if (result.data) {
        return result.data;
      }
    },
    placeholderData: keepPreviousData,
  });

  let announcements: IAnnouncementsResponse[] = [];
  if (data) {
    announcements = data;
  }

  const filteredAnnouncements = announcements.filter(announcement => {
    const annoucementDate = announcement.comunicado.datacriacao;
    const parsedDate = parseISO(annoucementDate);

    if (!search.trim() && startDate && endDate) {
      return startDate <= parsedDate && endDate >= parsedDate;
    }
    if (!search.trim() && startDate && !endDate) {
      return startDate <= parsedDate;
    }
    if (!search.trim() && !startDate && endDate) {
      return endDate >= parsedDate;
    }
    if (search.trim() && startDate && endDate) {
      const hasName = announcement.comunicado.titulo
        .toLowerCase()
        .includes(search.toLowerCase());
      const isInStartDateRange = startDate <= parsedDate;
      const isInEndDateRange = endDate >= parsedDate;
      return hasName && isInEndDateRange && isInStartDateRange;
    }
    return announcement.comunicado.titulo
      .toLowerCase()
      .includes(search.toLowerCase());
  });
  const pagination = usePaginationRange(
    filteredAnnouncements,
    DEFAULT_PAGE_SIZE,
  );

  useEffect(() => {
    pagination.setCurrentPage(1);
  }, [search]);

  const updateViewStatus = async () => {
    const response = await updateAnnouncement(announcementIdRef.current);
    if (response.error) {
      notifyError(response.error);
    }
    refetch();
    setDetailsModal(true);
  };

  return (
    <Page>
      <AnnouncementDetailsModal
        isOpen={detailsModal}
        onClose={() => setDetailsModal(false)}
        announcementId={announcementIdRef.current}
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
              onClick={() => {
                announcementIdRef.current = announcement.id;
                updateViewStatus();
              }}
            >
              <Table.Row>
                <Table.BodyCell>
                  {announcement.comunicado.titulo}
                </Table.BodyCell>
                <Table.BodyCell className="content">
                  <Content>{announcement.comunicado.texto}</Content>
                </Table.BodyCell>
                <Table.BodyCell>
                  {format(
                    parseISO(announcement.comunicado.datacriacao),
                    'dd/MM/yyyy',
                  )}
                </Table.BodyCell>
              </Table.Row>
              {!announcement.visto && <NotSeenIndicator />}
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
