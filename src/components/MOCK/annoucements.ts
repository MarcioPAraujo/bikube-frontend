const getAnnouncements = () => {
  const announcements = [];
  for (let i = 1; i <= 1319; i++) {
    announcements.push({
      id: i.toString(),
      title: `Announcement ${i}`,
      content: `Conteúdo do comunicado ${i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      date: new Date().toISOString(),
    });
  }
  return announcements;
};

export const announcements = getAnnouncements();
