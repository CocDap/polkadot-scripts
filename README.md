
# Series scripts for calling Pallet/Contract via PAPI 


0. Add chain metadata

for example: Westend2

```bash
npx papi add west -n westend2
```

1. Install dependencies

> [!NOTE]
> Node v20+ and pnpm v9.6+ are recommended for this project. But `Bun` works too <3 

```bash
pnpm i
```

> [!IMPORTANT]
> Probably you would need to use `npx papi` to setup the Polkadot API

To run the script:

```bash
pnpm <name of script>
```

> [!WARNING]
> Make sure you have created a `.env` file with your private key
> if you do not have one run




