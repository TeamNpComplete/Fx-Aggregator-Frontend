export let appConfiguration = {
  supportedCurrencies: ['USD - United States dollar', 'EUR - European euro', 'INR - Indian rupee', 'JPY - Japanese yen', 'GBP - Pound sterling', 'CNY - Chinese Yuan Renminbi', 'AUD - 	Australian dollar', 'CAD - Canadian dollar', 'CHF - Swiss franc'],
  supportedVendors: ['European Central Bank', 'Bank Of America', 'FCS'],
  currencyMap: new Map([
    ["USD - United States dollar", "USD"],
    ["EUR - European euro", "EUR"],
    ["INR - Indian rupee", "INR"],
    ["JPY - Japanese yen", "JPY"],
    ["GBP - Pound sterling", "GBP"],
    ["CNY - Chinese Yuan Renminbi", "CNY"],
    ["CHF - Swiss franc", "CHF"],
    ["AUD - Australian dollar", "AUD"],
   ])
}
