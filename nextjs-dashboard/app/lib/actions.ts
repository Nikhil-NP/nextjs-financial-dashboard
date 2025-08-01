'use server';
import {z} from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache'; //updating the data displayed in the invoices route,hense clearing cache and triggering new request to  server.
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});


const CreateInvoice = FormSchema.omit({id:true,date:true});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
 
export async function createInvoice(prevState: State, formData: FormData) {
      const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
        // If form validation fails, return errors early. Otherwise, continue.
        if (!validatedFields.success) {
            return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
            };
        }

      const amountInCents = validatedFields.data.amount * 100; //avoid js floting point issue
      const date = new Date().toISOString().split('T')[0];

      try {
            await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${validatedFields.data.customerId}, ${amountInCents}, ${validatedFields.data.status}, ${date})`;
      } catch (error) {
        console.error(error)
        
      } 
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
 
  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export  async function deleteInvoices(id:string){
    //throw new Error('Failed to Delete Invoice');  //testing the error.tsx in app/dashboard/invoice
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");//no redirect as we are in the main page itself

}