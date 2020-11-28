export let appConfiguration = {
  supportedCurrencies: ['USD - United States dollar', 'EUR - European euro', 'INR - Indian rupee', 'JPY - Japanese yen', 'GBP - Pound sterling', 'CNY - Chinese Yuan Renminbi', 'AUD - Australian dollar', 'CAD - Canadian dollar', 'CHF - Swiss franc','NZD - New Zealand dollar','HKD - Hong Kong dollar','SEK - Swedish krona','KRW - South Korean won','SGD - Singapore dollar','NOK - Norwegian krone','MXN - Mexican peso','RUB - Russian ruble','ZAR - South African rand','TRY - Turkish lira','BRL - Brazilian real'],
  predictionSupportedCurrencies: ['USD - United States dollar', 'EUR - European euro', 'INR - Indian rupee', 'JPY - Japanese yen', 'GBP - Pound sterling', 'CNY - Chinese Yuan Renminbi', 'AUD - Australian dollar', 'CAD - Canadian dollar', 'CHF - Swiss franc'],
  supportedVendors: ['European Central Bank', 'Bank Of America', 'Currency Layer API'],
  currencyMap: new Map([
      ["USD - United States dollar", "USD"],
      ["EUR - European euro", "EUR"],
      ["INR - Indian rupee", "INR"],
      ["JPY - Japanese yen", "JPY"],
      ["GBP - Pound sterling", "GBP"],
      ["CNY - Chinese Yuan Renminbi", "CNY"],
      ["CHF - Swiss franc", "CHF"],
      ["AUD - Australian dollar", "AUD"],
   ]),

   predictionCurrencyMap: new Map([
    ["USD - United States dollar", "USD"],
    ["EUR - European euro", "EUR"],
    ["INR - Indian rupee", "INR"],
    ["JPY - Japanese yen", "JPY"],
    ["GBP - Pound sterling", "GBP"],
    ["CNY - Chinese Yuan Renminbi", "CNY"],
    ["CAD - Canadian dollar", "CHF"],
    ["AUD - Australian dollar", "AUD"],
 ])



}
