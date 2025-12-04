import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { CustomerForm } from '@/components/admin/CustomerForm';

async function getCustomer(id: string) {
  try {
    return await prisma.customer.findUnique({
      where: { id },
    });
  } catch {
    return null;
  }
}

export default async function EditCustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const customer = await getCustomer(params.id);

  if (!customer) {
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Customer</h1>
        <p className="text-muted-foreground">Update customer information</p>
      </div>
      <CustomerForm customer={customer} />
    </div>
  );
}



