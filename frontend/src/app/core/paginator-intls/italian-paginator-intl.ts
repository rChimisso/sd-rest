import {MatPaginatorIntl} from '@angular/material/paginator';

function italianRangeLabel(page: number, pageSize: number, length: number) {
  if (length !== 0 && pageSize !== 0) {
    const safeLength = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < safeLength ? Math.min(startIndex + pageSize, safeLength) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} di ${safeLength}`;
  }
  return `0 di ${length}`;
}

export function getItalianPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Elementi per pagina:';
  paginatorIntl.nextPageLabel = 'Pagina successiva';
  paginatorIntl.previousPageLabel = 'Pagina precedente';
  paginatorIntl.firstPageLabel = 'Prima pagina';
  paginatorIntl.lastPageLabel = 'Ultima pagina';
  paginatorIntl.getRangeLabel = italianRangeLabel;
  return paginatorIntl;
}
