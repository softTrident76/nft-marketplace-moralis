import { ExposureRounded, ResetTvRounded } from "@mui/icons-material";
import axios from "axios";
import { ethers } from "ethers";
import { func } from "prop-types";

export async function getTokenMetadataByTokenId(nftContract, tokenId) {
    try {
        const tokenUri = await nftContract.tokenURI(tokenId)
        const {data: metadata} = await axios.get(tokenUri)
        return metadata
    } catch(err) {
        console.log(err)
    }
}

export function mapAvailableMarketItems (nftContract) {
    return async(marketItem) => {
        const metadata = await getTokenMetadataByTokenId(nftContract, marketItem.tokenId)
        return mapAvailableMarketItems(marketItem, metadata)
    }
}

export function mapCreatedAndOwnedTokenIdsAsMarketItems(marketplaceContract, nftContract, account){
    return async(tokenId) => {
        const metadata = await getTokenMetadataByTokenId(nftContract, tokenId)
        const approveAddress = await nftContract.getApproved(tokenId)
        const hasMarketApproval = approveAddress === marketplaceContract.address 
        const [foundMarketItem, hasFound] = await marketplaceContract.getLatestMarketItemByTokenId(tokenId)
        const marketItem = hasFound ? foundMarketItem : {}
        return mapMarketItem(marketItem, metadata, tokenId, account, hasMarketApproval)
    }
}

export function mapMarketItem(marketItem, metadata, tokenId, account, hasMarketApproval) {
    return {
        price: marketItem.price ? ethers.utils.formatUnits(marketItem.price, 'ether') : undefined,
        tokenId: marketItem.tokenId || tokenId,
        marketItemId: marketItem.marketItemId || undefined,
        creator: marketItem.creator || account,
        seller: marketItem.seller || undefined,
        owner: marketItem.owner || account,
        sold: marketItem.sold || false,
        canceled: marketItem.canceled || false,
        image: metadata.image,
        name: metadata.name,
        description: metadata.description,
        hasMarketApproval: hasMarketApproval || false
    }
}

