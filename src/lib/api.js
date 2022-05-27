import { Buffer } from 'buffer';
import { bech32 } from 'bech32';
import assets from '$lib/assets';
// import "@emurgo/cardano-serialization-lib-asmjs";

const baseUrl = 'https://pool.pm/wallet/';

export async function getAllAssets(address) {
	const response = await fetch(baseUrl + address);
	const tokens = (await response.json())?.tokens;

	return tokens
		?.map((a) => {
			return {
				...a,
				cardania: assets.filter((b) => b.policyId === a.policy)[0]?.name,
				image: assets.filter((b) => b.policyId === a.policy)[0]?.image
			};
		})
		.filter((c) => c.cardania);
}

export function getAddressFromHex(hexAddress) {
	// const typeHex = hexAddress.toLowerCase().charAt(0);
	const networkId = Number(hexAddress.toLowerCase().charAt(1));
	let stakeCredential;
	let paymentCredential;
	//   switch (typeHex) {
	// case "e":
	//   stakeCredential = {
	//     hash: hexAddress.slice(2).slice(0, 56),
	//     type: HashType.ADDRESS,
	//   };
	//   return new RewardAddress(networkId, stakeCredential);
	// case "f":
	//   stakeCredential = {
	//     hash: hexAddress.slice(2).slice(0, 56),
	//     type: HashType.SCRIPT,
	//   };
	//   return new RewardAddress(networkId, stakeCredential);
	// case "7": {
	//   paymentCredential = {
	//     hash: hexAddress.slice(2),
	//     type: HashType.SCRIPT,
	//   };
	//   return new EnterpriseAddress(networkId, paymentCredential);
	// }
	// case "6": {
	//   paymentCredential = {
	//     hash: hexAddress.slice(2),
	//     type: HashType.ADDRESS,
	//   };
	//   return new EnterpriseAddress(networkId, paymentCredential);
	// }
	// case "5": {
	//   paymentCredential = {
	//     hash: hexAddress.slice(2).slice(0, 56),
	//     type: HashType.SCRIPT,
	//   };
	//   const vlq = hexAddress.slice(2).slice(56);
	//   return new PointerAddress(networkId, paymentCredential, vlq);
	// }
	// case "4": {
	//   paymentCredential = {
	//     hash: hexAddress.slice(2).slice(0, 56),
	//     type: HashType.ADDRESS,
	//   };
	//   const vlq = hexAddress.slice(2).slice(56);
	//   return new PointerAddress(networkId, paymentCredential, vlq);
	// }
	// case "3":
	//   paymentCredential = {
	//     hash: hexAddress.slice(2).slice(0, 56),
	//     type: HashType.SCRIPT,
	//   };
	//   stakeCredential = {
	//     hash: hexAddress.slice(2).slice(56),
	//     type: HashType.SCRIPT,
	//   };
	//   return new BaseAddress(networkId, paymentCredential, stakeCredential);
	// case "2":
	//   paymentCredential = {
	//     hash: hexAddress.slice(2).slice(0, 56),
	//     type: HashType.ADDRESS,
	//   };
	//   stakeCredential = {
	//     hash: hexAddress.slice(2).slice(56),
	//     type: HashType.SCRIPT,
	//   };
	//   return new BaseAddress(networkId, paymentCredential, stakeCredential);
	// case "1":
	//   paymentCredential = {
	//     hash: hexAddress.slice(2).slice(0, 56),
	//     type: HashType.SCRIPT,
	//   };
	//   stakeCredential = {
	//     hash: hexAddress.slice(2).slice(56),
	//     type: HashType.ADDRESS,
	//   };
	//   return new BaseAddress(networkId, paymentCredential, stakeCredential);
	// case "0":
	paymentCredential = {
		hash: hexAddress.slice(2).slice(0, 56),
		type: 0
	};
	stakeCredential = {
		hash: hexAddress.slice(2).slice(56),
		type: 0
	};
	//   return new BaseAddress(networkId, paymentCredential, stakeCredential);

	let payload = 0;

	// if (this._paymentCredential.type === HashType.ADDRESS) {
	//   // set 4th bit to 0, which is set by default
	// } else if (this._paymentCredential.type === HashType.SCRIPT) {
	//   const mask = 1 << 4;
	//   payload |= mask;
	// }
	// if (this.stakeCredential.type === HashType.ADDRESS) {
	//   // set 5th bit to 0, which is set by default
	// } else if (this.stakeCredential.type === HashType.SCRIPT) {
	//   const mask = 1 << 5;
	//   payload |= mask;
	// }
	payload |= networkId;
	const address = `${payload.toString(16).padStart(2, '0')}${paymentCredential.hash}${
		stakeCredential.hash
	}`;
	// const addressHex = address;
	const addressBytes = Buffer.from(address, 'hex');
	// const addressBech32 = computeBech32(addressBytes);

	const data = 'addr';
	const words = bech32.toWords(addressBytes);
	const encoded = bech32.encode(data, words, 1000);
	return encoded;

	// case "8":
	//   return new ByronAddress(Buffer.from(hexAddress, "hex"));
	// default:
	//   throw new Error("Unsupported address type");
	//   }
}
