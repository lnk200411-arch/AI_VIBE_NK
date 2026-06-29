import PageContainer from '../components/common/PageContainer';

function AllFilesPage({ user, searchQuery, refreshKey }) {
  return (
    <PageContainer
      title='전체보기'
      mode='all'
      user={user}
      searchQuery={searchQuery}
      refreshKey={refreshKey}
      emptyMessage='아직 업로드된 파일이 없습니다.'
    />
  );
}

export default AllFilesPage;
