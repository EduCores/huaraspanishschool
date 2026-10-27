/**
 * Control de acceso por rol dentro del Studio.
 *
 * - OWNER (eduardonavarrocores@gmail.com): ve TODO el admin, construido intacto.
 * - Resto de usuarios (rol editor, p. ej. el cliente): ven solo las secciones
 *   que le competen (programas, reseñas, FAQ, historia, lookbook), con los
 *   campos técnicos ocultos y sin acciones destructivas.
 */
export const OWNER_EMAIL = 'eduardonavarrocores@gmail.com';

type MinimalRole = { name?: string };
type MinimalUser = { email?: string; roles?: MinimalRole[] } | null | undefined;

function hasAdminRole(user: MinimalUser): boolean {
  return !!user?.roles?.some((role) => role.name === 'administrator');
}

export function isOwner(user: MinimalUser): boolean {
  return !!user && (user.email === OWNER_EMAIL || hasAdminRole(user));
}

/** helpers para `hidden` de campo/documento: reciben el contexto del formulario */
export function hiddenOwnerOnly({ currentUser }: { currentUser?: MinimalUser }): boolean {
  return !isOwner(currentUser);
}
