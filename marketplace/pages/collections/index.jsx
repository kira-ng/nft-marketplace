import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Image from "next/image";

import NFTCard from "../../components/NFTCard";

import { nftmarketaddress, nftaddress } from "../../config";

import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

import banner from "../../assets/banner.png";
import mew from "../../assets/avatar.png";

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem] p-4`,
  title: `text-5xl font-bold mb-4`,
};

export default function Collections() {
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchItemsCreated();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          sold: i.sold,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter((i) => i.sold);
    setSold(soldItems);
    setNfts(items);
    setLoadingState("loaded");
  }

  const isNoAsset = loadingState === "loaded" && !nfts.length;

  if (isNoAsset)
    return (
      <>
        <div className={style.bannerImageContainer}>
          <img className={style.bannerImage} src={banner.src} alt="banner" />
        </div>
        <div className={style.infoContainer}>
          <div className={style.midRow}>
            <img
              className={style.profileImg}
              src={mew.src}
              alt="profile image"
            />
          </div>
        </div>
        <div className={style.midRow}>
          <div className={style.title}>No NFTs Created</div>
        </div>
      </>
    );

  return (
    <div>
      <div className={style.bannerImageContainer}>
        <img className={style.bannerImage} src={banner.src} alt="banner" />
      </div>
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img className={style.profileImg} src={mew.src} alt="profile image" />
        </div>
      </div>

      <div className={style.midRow}>
        <div className={style.title}>NFTs Created</div>
      </div>
      <div className="flex flex-wrap ">
        {nfts.map((nft, id) => (
          <NFTCard
            key={id}
            nftItem={nft}
            name={nft.name}
            listings={nft.price}
          />
        ))}
      </div>

      {Boolean(sold.length) && (
        <>
          <div className={style.midRow}>
            <div className={style.title}>NFTs sold</div>
          </div>
          <div className="flex flex-wrap">
            {sold.map((nft, id) => (
              <NFTCard key={id} nftItem={nft} listings={nft.price} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
