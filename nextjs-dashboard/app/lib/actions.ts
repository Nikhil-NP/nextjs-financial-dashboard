'use server';
import {z} from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache'; //updating the data displayed in the invoices route,hense clearing cache and triggering new request to  server.
import { redirect } from 'next/navigation';
import { DeleteInvoice } from '../ui/invoices/buttons';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending','paid']),
    date: z.string(),
});
const CreateInvoice = FormSchema.omit({id:true,date:true});

export async function createInvoice(formData: FormData) {
    const  { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
      const amountInCents = amount * 100; //avoid js floting point issue
      const date = new Date().toISOString().split('T')[0];

      await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
    revalidatePath('/dashboard/invoices');//path revalidated,  fresh data  fetched from server
    redirect('/dashboard/invoices');
 }

 // Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export  async function deleteInvoices(id:string){
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");//no redirect as we are in the main page itself

}