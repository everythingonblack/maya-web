'use client';

import { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';
import FileGrid from '@/app/shared/file/manager/file-grid';
import FileListTable from '@/app/shared/file/manager/file-list/table';
import { getDocuments } from '@/api';

export default function PageLayout() {
  const searchParams = useSearchParams();
  const layout = searchParams.get('layout');
  const isGridLayout = layout?.toLowerCase() === 'grid';

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const data = await getDocuments();
        setDocuments(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDocuments();
  }, []);

  if (loading) return <div>Loading documents...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return isGridLayout ? <FileGrid documents={documents} /> : <FileListTable documents={documents} />;
}
