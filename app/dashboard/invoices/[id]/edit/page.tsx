import EditInvoiceForm from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";

export default async function Page({ params }: {
    params: {id: string}
}) {
    const paramsId = params.id;
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(paramsId),
        fetchCustomers(),
    ])
    // const { amount, id, customerId, status } = invoice
    const id = invoice?.id
    const customerId = invoice?.customer_id
    const amount = invoice?.amount
    const status = invoice?.status
    
    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Invoices", href: "/dashboard/invoices" },
            {
              label: "Edit Invoice",
              href: "/dashboard/invoices/${id}/edit",
              active: true,
            },
          ]}
        />
        <EditInvoiceForm
          invoice={{
            id: id || "",
            customer_id: customerId || "",
            amount: amount || 0,
            status: status || 'pending',
          }}
          customers={customers}
        />
      </main>
    );
}