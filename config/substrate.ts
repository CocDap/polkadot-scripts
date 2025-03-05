import { west} from "@polkadot-api/descriptors";

// https://metadata.parity.io/?tab=0#/kusama-statemine
export const polkadotConfig = {
	west: {
		wss: "wss://westend.dotters.network",
		client: west,
	},


};
