import { west} from "@polkadot-api/descriptors";
import { createClient, TypedApi } from "polkadot-api";
import { getWsProvider } from "polkadot-api/ws-provider/node";
import { polkadotConfig } from "./substrate";

const typedApi = {
	west
};

export type Chain = keyof typeof polkadotConfig;
export const CHAIN: Chain = 'west'

export function magicApi<T>(chain: Chain = CHAIN) {
	const client = createClient(getWsProvider(polkadotConfig[chain].wss));
	return { api: client.getTypedApi(typedApi[chain]), disconnect: client.destroy }; 
}


export type FullApi = ReturnType<typeof magicApi>;
export type ApiPromise = Pick<FullApi, 'api'>;