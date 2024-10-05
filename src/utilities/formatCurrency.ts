const CURRENCY_FORMATTER = new Intl.NumberFormat("es-CO", {
  currency: "COP",
  style: "currency",
});

export function formatCurrency(number:number){
   return CURRENCY_FORMATTER.format(number)
}