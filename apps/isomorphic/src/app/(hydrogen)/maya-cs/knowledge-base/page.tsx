import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import FileStats from '@/app/shared/file/manager/file-stats';
import { metaObject } from '@/config/site.config';
import UploadButton from '@/app/shared/upload-button';
import PageLayout from '@/app/(hydrogen)/maya-cs/knowledge-base/page-layout';
import FileUpload from '@/app/shared/file-upload';

export const metadata = {
  ...metaObject('File Manager'),
};

const pageHeader = {
  title: 'Knowledge Base',
  breadcrumb: [
    {
      href: routes.mayaCS.dashboard,
      name: 'Home',
    },
    {
      href: routes.mayaCS.knowledge,
      name: 'AI Knowledge',
    },
    {
      name: 'List',
    },
  ],
};

export default function FileListPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <UploadButton modalView={<FileUpload />} />
      </PageHeader>

      <FileStats className="mb-6 @5xl:mb-8 @7xl:mb-11" />
      <PageLayout />
    </>
  );
}
