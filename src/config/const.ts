export const SERIES_CONTRACT_ADDRESSES = [
    'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
    'KT1QctVjmHzMTBBmHLwoYToaodEx7n1BXG1b',
    'KT1AgMH7AjVGb8G27xjSih4C7pWQSdZ8brSN',
    'KT1QctVjmHzMTBBmHLwoYToaodEx7n1BXG1b',
]

export const SERIES_API_LINK = [
    'https://staging.api.tzkt.io/v1/tokens/balances?account=${address}&balance=1&token.metadata.symbol=OBJKT&token.metadata.tags.[*]=PixelDeMNs&select=token.metadata.artifactUri',
    'https://staging.api.tzkt.io/v1/tokens/balances?active=true&token.contract=${pixeldemncontract}&account=${address}&select=token.metadata.image',
    'https://staging.api.tzkt.io/v1/tokens/balances?active=true&token.contract=${pixeldemncontract}&account=${address}&select=token.metadata.image',
    'https://staging.api.tzkt.io/v1/tokens/balances?account=${address}&balance=1&token.metadata.symbol=OBJKT&token.metadata.tags.[*]=PixelDeMNs&select=token.metadata.artifactUri',
]