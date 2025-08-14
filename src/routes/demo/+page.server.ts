import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

function isEmail(v: string) {
  return /.+@.+\..+/.test(v);
}

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const name = (formData.get('name') || '').toString().trim();
    const phone = (formData.get('phone') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const business = (formData.get('business') || '').toString().trim();
    const businessType = (formData.get('businessType') || '').toString().trim();
    const currentClients = (formData.get('currentClients') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    if (!name) return fail(400, { error: 'Tu nombre es requerido', field: 'name' });
    if (!phone) return fail(400, { error: 'El teléfono es requerido', field: 'phone' });
    if (!email || !isEmail(email)) return fail(400, { error: 'Email inválido', field: 'email' });
    if (!business) return fail(400, { error: 'El nombre del negocio es requerido', field: 'business' });
    if (!businessType) return fail(400, { error: 'Selecciona el tipo de negocio', field: 'businessType' });

    // NOTE: Backend integration placeholder
    // Here you could call your API to register the demo interest, e.g. POST /leads or /demos
    // For now we emulate success so the page provides real feedback and UX.

    // Simulated async processing
    await new Promise((res) => setTimeout(res, 300));

    return {
      success: true,
      message: '¡Gracias! Te contactaremos por WhatsApp y correo en breve.',
      data: {
        name,
        phone,
        email,
        business,
        businessType,
        currentClients,
        message
      }
    };
  }
};
