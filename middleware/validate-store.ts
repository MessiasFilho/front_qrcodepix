import { useStore } from "~/store/store";

export default defineNuxtRouteMiddleware(async (to) => {
  const storepage = to.params.storepage as string;
  const userhash = to.params.userhash as string;

  if (!storepage || !userhash) {
    return showError({ statusCode: 404, statusMessage: 'Parâmetros inválidos' });
  }

  const store = useStore()

  const ok = await store.GetStoroByClient(storepage, userhash)

   if (!ok) {
    return showError({ statusCode: 404, statusMessage: 'Loja ou hash inválido' })
  }


});