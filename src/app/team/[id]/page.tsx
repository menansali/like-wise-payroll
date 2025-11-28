import { notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import { getEmployeeById } from '@/lib/employees';
import EmployeeDetailClient from '@/components/employees/EmployeeDetailClient';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TeamMemberPage({ params }: Props) {
  const { id } = await params;
  const employee = getEmployeeById(id);

  if (!employee) {
    return notFound();
  }

  return (
    <Layout>
      <EmployeeDetailClient employee={employee} />
    </Layout>
  );
}


