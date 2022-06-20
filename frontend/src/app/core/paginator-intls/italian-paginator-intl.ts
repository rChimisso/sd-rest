import {MatPaginatorIntl} from '@angular/material/paginator';

/**
 * Restituisce la label per il range delle pagine del {@link MatPaginatorIntl Paginatore}.
 *
 * @param {number} page numero di pagina attuale.
 * @param {number} pageSize numero di elementi per pagina.
 * @param {number} length numero di elementi totali.
 * @returns {string}
 */
function italianRangeLabel(page: number, pageSize: number, length: number): string {
  if (length !== 0 && pageSize !== 0) {
    const safeLength = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < safeLength ? Math.min(startIndex + pageSize, safeLength) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} di ${safeLength}`;
  }
  return `0 di ${length}`;
}

/**
 * Restituisce il {@link MatPaginatorIntl Paginatore} con le label tradotte in italiano.
 *
 * @export
 * @returns {MatPaginatorIntl}
 */
export function getItalianPaginatorIntl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Elementi per pagina:';
  paginatorIntl.nextPageLabel = 'Pagina successiva';
  paginatorIntl.previousPageLabel = 'Pagina precedente';
  paginatorIntl.firstPageLabel = 'Prima pagina';
  paginatorIntl.lastPageLabel = 'Ultima pagina';
  paginatorIntl.getRangeLabel = italianRangeLabel;
  return paginatorIntl;
}
